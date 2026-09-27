import { Request, Response } from 'express';
import Gallery from '../models/Gallery.js';

// @desc    Get gallery items (filterable by category or isBeforeAfter)
// @route   GET /api/gallery
// @access  Public
export const getGallery = async (req: Request, res: Response) => {
  try {
    const { category, beforeAfter } = req.query;
    const filter: any = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (beforeAfter === 'true') {
      filter.isBeforeAfter = true;
    }

    const gallery = await Gallery.find(filter).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: gallery.length,
      data: gallery,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get gallery item by ID
// @route   GET /api/gallery/:id
// @access  Public
export const getGalleryById = async (req: Request, res: Response) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create gallery item
// @route   POST /api/gallery
// @access  Protected (Admin)
export const createGallery = async (req: Request, res: Response) => {
  try {
    const { title, category, image } = req.body;
    if (!title || !category || !image) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and image URL are required',
      });
    }

    const item = await Gallery.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Gallery item created successfully',
      data: item,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Protected (Admin)
export const updateGallery = async (req: Request, res: Response) => {
  try {
    const updated = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    res.json({
      success: true,
      message: 'Gallery item updated successfully',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Protected (Admin)
export const deleteGallery = async (req: Request, res: Response) => {
  try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
