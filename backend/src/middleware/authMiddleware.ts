import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

export interface AuthRequest extends Request {
  user?: any;
}

export const protectAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // 1. Check Bearer token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // 2. Or check cookie
  else if (req.cookies && req.cookies.luxe_admin_token) {
    token = req.cookies.luxe_admin_token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. You must be authenticated as an administrator to access this resource.',
    });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'luxe_salon_luxury_secret_jwt_key_2026_super_secure_tiruppur');
    const user = await AdminUser.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authorization token. User not found.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authorization session expired or invalid. Please sign in again.',
    });
  }
};
