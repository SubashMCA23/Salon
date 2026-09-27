import rateLimit from 'express-rate-limit';

// Rate limit for booking submissions: 10 requests per 15 minutes per IP
export const appointmentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many appointment requests from this connection. Please wait a few moments or book directly via WhatsApp.',
  },
});

// Rate limit for contact messages: 10 requests per 15 minutes per IP
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent. Please try again later or contact us directly via WhatsApp / phone.',
  },
});

// Rate limit for admin authentication: 10 attempts per 15 minutes per IP
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
});
