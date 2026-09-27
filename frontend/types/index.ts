export type ServiceCategory = 'HAIR' | 'BEAUTY' | 'BRIDAL & OCCASIONS' | 'MEN\'S GROOMING';

export interface Service {
  _id: string;
  name: string;
  category: ServiceCategory;
  subCategory?: string;
  description: string;
  longDescription?: string;
  price: number;
  startingPrice: boolean;
  duration: string;
  image: string;
  isActive: boolean;
  isFeatured: boolean;
  benefits?: string[];
  processSteps?: string[];
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  _id: string;
  title: string;
  category: 'Hair' | 'Beauty' | 'Bridal' | 'Men' | 'Salon';
  image: string;
  isBeforeAfter: boolean;
  beforeImage?: string;
  afterImage?: string;
  description?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  _id: string;
  name: string;
  description: string;
  services: string[];
  price: number;
  discountPrice: number;
  image: string;
  validUntil: string;
  isActive: boolean;
  badge?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  _id: string;
  customerName: string;
  review: string;
  rating: number;
  image?: string;
  isApproved: boolean;
  serviceUsed?: string;
  location?: string;
  createdAt: string;
}

export interface Appointment {
  _id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentInput {
  name: string;
  phone: string;
  email: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  message?: string;
}

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
  totalServices: number;
  activeOffers: number;
  unreadMessages: number;
  totalGalleryItems: number;
  totalReviews: number;
  recentAppointments: Appointment[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  token?: string;
  user?: AdminUser;
  bookingRef?: string;
  whatsappUrl?: string;
  related?: Service[];
}
