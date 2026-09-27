import { Request, Response } from 'express';
import Service from '../models/Service.js';

// @desc    Get all services (supports category filter & search)
// @route   GET /api/services
// @access  Public
export const getServices = async (req: Request, res: Response) => {
  try {
    const { category, search, activeOnly } = req.query;
    const filter: any = {};

    if (activeOnly !== 'false') {
      filter.isActive = true;
    }

    if (category && category !== 'ALL') {
      filter.category = (category as string).toUpperCase();
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { description: { $regex: search as string, $options: 'i' } },
        { subCategory: { $regex: search as string, $options: 'i' } },
      ];
    }

    const services = await Service.find(filter).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found with requested ID',
      });
    }

    // Also find related services in same category
    const related = await Service.find({
      category: service.category,
      _id: { $ne: service._id },
      isActive: true,
    }).limit(3);

    res.json({
      success: true,
      data: service,
      related,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Protected (Admin)
export const createService = async (req: Request, res: Response) => {
  try {
    const { name, category, description, price, duration, image } = req.body;

    if (!name || !category || !description || price === undefined || !duration || !image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, category, description, price, duration, image',
      });
    }

    const newService = await Service.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: newService,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Protected (Admin)
export const updateService = async (req: Request, res: Response) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Protected (Admin)
export const deleteService = async (req: Request, res: Response) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.json({
      success: true,
      message: 'Service removed successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
