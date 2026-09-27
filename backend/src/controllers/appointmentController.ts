import { Request, Response } from 'express';
import Appointment from '../models/Appointment.js';

// Helper to validate email format
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Helper to validate phone format
const isValidPhone = (phone: string): boolean => {
  // Accepts formats like +91 9876543210, 9876543210, +91-98765-43210, etc.
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  return cleaned.length >= 7 && cleaned.length <= 15 && /^\d+$/.test(cleaned);
};

// @desc    Create new appointment booking
// @route   POST /api/appointments
// @access  Public
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, service, appointmentDate, appointmentTime, message } = req.body;

    // 1. Required field validation
    if (!name || !phone || !email || !service || !appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        message: 'All fields (Name, Phone, Email, Service, Date, Time) are required.',
      });
    }

    // 2. Email format validation
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // 3. Phone number validation
    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid contact phone number.',
      });
    }

    // 4. Date validation (prevent past dates)
    const bookingDate = new Date(appointmentDate);
    if (isNaN(bookingDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid appointment date selected.',
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(bookingDate);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Appointment date cannot be in the past. Please select today or an upcoming date.',
      });
    }

    // 5. Create appointment record
    const appointment = await Appointment.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      service: service.trim(),
      appointmentDate: bookingDate,
      appointmentTime: appointmentTime.trim(),
      message: message ? message.trim() : undefined,
      status: 'pending',
    });

    // Formulate pre-composed WhatsApp message text
    const formattedDate = bookingDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const whatsappMessage = `Hello Luxe Salon! ✨\nI have requested an appointment:\n\n*Name:* ${appointment.name}\n*Service:* ${appointment.service}\n*Date:* ${formattedDate}\n*Time:* ${appointment.appointmentTime}\n*Phone:* ${appointment.phone}\n*Booking ID:* #${appointment._id.toString().slice(-6).toUpperCase()}\n\nPlease confirm my appointment slot. Thank you!`;

    const salonWhatsAppNumber = process.env.SALON_WHATSAPP_NUMBER || '919786149477'; // Luxe Salon Tiruppur Official Number
    const whatsappUrl = `https://wa.me/${salonWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    res.status(201).json({
      success: true,
      message: 'Your appointment request has been received. Our concierge will confirm your slot shortly.',
      data: appointment,
      bookingRef: appointment._id.toString().slice(-6).toUpperCase(),
      whatsappUrl,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all appointments (filter by status, date, search)
// @route   GET /api/appointments
// @access  Protected (Admin)
export const getAppointments = async (req: Request, res: Response) => {
  try {
    const { status, date, search } = req.query;
    const filter: any = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (date) {
      const d = new Date(date as string);
      const startOfDay = new Date(d.setHours(0, 0, 0, 0));
      const endOfDay = new Date(d.setHours(23, 59, 59, 999));
      filter.appointmentDate = { $gte: startOfDay, $lte: endOfDay };
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { phone: { $regex: search as string, $options: 'i' } },
        { email: { $regex: search as string, $options: 'i' } },
        { service: { $regex: search as string, $options: 'i' } },
      ];
    }

    const appointments = await Appointment.find(filter).sort({ appointmentDate: 1, createdAt: -1 });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Protected (Admin)
export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({ success: true, data: appointment });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update appointment status
// @route   PATCH /api/appointments/:id/status
// @access  Protected (Admin)
export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const { status, notes } = req.body;

    const allowedStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}`,
      });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const updated = await Appointment.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({
      success: true,
      message: `Appointment status updated to '${updated.status}'`,
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Protected (Admin)
export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({ success: true, message: 'Appointment removed successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
