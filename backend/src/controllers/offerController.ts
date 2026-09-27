import { Request, Response } from 'express';
import Offer from '../models/Offer.js';

// @desc    Get offers (active by default for public, all for admin)
// @route   GET /api/offers
// @access  Public
export const getOffers = async (req: Request, res: Response) => {
  try {
    const { all } = req.query;
    const filter: any = {};

    if (all !== 'true') {
      filter.isActive = true;
      filter.validUntil = { $gte: new Date() };
    }

    const offers = await Offer.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: offers.length,
      data: offers,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single offer
// @route   GET /api/offers/:id
// @access  Public
export const getOfferById = async (req: Request, res: Response) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }
    res.json({ success: true, data: offer });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create offer
// @route   POST /api/offers
// @access  Protected (Admin)
export const createOffer = async (req: Request, res: Response) => {
  try {
    const { name, description, services, price, discountPrice, image, validUntil } = req.body;
    if (!name || !description || !services || price === undefined || discountPrice === undefined || !image || !validUntil) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields for the offer',
      });
    }

    const offer = await Offer.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Offer created successfully',
      data: offer,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update offer
// @route   PUT /api/offers/:id
// @access  Protected (Admin)
export const updateOffer = async (req: Request, res: Response) => {
  try {
    const updated = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    res.json({
      success: true,
      message: 'Offer updated successfully',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete offer
// @route   DELETE /api/offers/:id
// @access  Protected (Admin)
export const deleteOffer = async (req: Request, res: Response) => {
  try {
    const deleted = await Offer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }
    res.json({ success: true, message: 'Offer removed successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
