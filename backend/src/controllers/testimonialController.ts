import { Request, Response } from 'express';
import Testimonial from '../models/Testimonial.js';

// @desc    Get testimonials (approved only for public, all for admin)
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const { all } = req.query;
    const filter: any = {};

    if (all !== 'true') {
      filter.isApproved = true;
    }

    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new testimonial / review submission
// @route   POST /api/testimonials
// @access  Public (moderated)
export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const { customerName, review, rating, serviceUsed, location } = req.body;

    if (!customerName || !review) {
      return res.status(400).json({
        success: false,
        message: 'Name and review text are required',
      });
    }

    const testimonial = await Testimonial.create({
      customerName,
      review,
      rating: Number(rating) || 5,
      serviceUsed,
      location: location || 'Tiruppur',
      image: req.body.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(customerName)}&background=1c1917&color=C5A880&bold=true`,
      isApproved: true, // Auto-approve or admin controlled
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your review! It has been published.',
      data: testimonial,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update testimonial approval status
// @route   PATCH /api/testimonials/:id
// @access  Protected (Admin)
export const updateTestimonialStatus = async (req: Request, res: Response) => {
  try {
    const { isApproved } = req.body;
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.json({
      success: true,
      message: 'Testimonial status updated',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Protected (Admin)
export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
