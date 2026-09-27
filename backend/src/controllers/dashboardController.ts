import { Request, Response } from 'express';
import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import Offer from '../models/Offer.js';
import ContactMessage from '../models/ContactMessage.js';
import Testimonial from '../models/Testimonial.js';
import Gallery from '../models/Gallery.js';

// @desc    Get dashboard metrics & stats
// @route   GET /api/dashboard/stats
// @access  Protected (Admin)
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      completedAppointments,
      totalServices,
      activeOffers,
      unreadMessages,
      totalGalleryItems,
      totalReviews,
      recentAppointments,
    ] = await Promise.all([
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: 'pending' }),
      Appointment.countDocuments({ status: 'confirmed' }),
      Appointment.countDocuments({ status: 'completed' }),
      Service.countDocuments({ isActive: true }),
      Offer.countDocuments({ isActive: true, validUntil: { $gte: new Date() } }),
      ContactMessage.countDocuments({ isRead: false }),
      Gallery.countDocuments(),
      Testimonial.countDocuments(),
      Appointment.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.json({
      success: true,
      data: {
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
        totalServices,
        activeOffers,
        unreadMessages,
        totalGalleryItems,
        totalReviews,
        recentAppointments,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
