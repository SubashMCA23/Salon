import {
  Service,
  GalleryItem,
  Offer,
  Testimonial,
  Appointment,
  AppointmentInput,
  ContactInput,
  ContactMessage,
  DashboardStats,
  ApiResponse,
  AdminUser,
} from '@/types';
import {
  FALLBACK_SERVICES,
  FALLBACK_GALLERY,
  FALLBACK_OFFERS,
  FALLBACK_TESTIMONIALS,
} from './fallbackData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('luxe_admin_token');
    }
    return null;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'include',
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An unexpected error occurred while communicating with the server.');
      }

      return data;
    } catch (error: any) {
      console.error(`[API Client Error] ${endpoint}:`, error.message);
      throw error;
    }
  }

  // SERVICES
  async getServices(category?: string, search?: string, activeOnly = true): Promise<Service[]> {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'ALL') params.append('category', category);
      if (search) params.append('search', search);
      if (!activeOnly) params.append('activeOnly', 'false');

      const res = await this.request<Service[]>(`/services?${params.toString()}`, {
        method: 'GET',
        next: { revalidate: 60 },
      });
      if (res && res.data && res.data.length > 0) {
        return res.data;
      }
    } catch (err) {
      console.warn('[API Client] Backend unreachable, serving fallback services:', err);
    }

    // Fallback services
    let filtered = [...FALLBACK_SERVICES];
    if (category && category !== 'ALL') {
      filtered = filtered.filter((s) => s.category.toUpperCase() === category.toUpperCase());
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          (s.subCategory && s.subCategory.toLowerCase().includes(q))
      );
    }
    return filtered;
  }

  async getServiceById(id: string): Promise<{ service: Service; related: Service[] }> {
    try {
      const res = await this.request<Service>(`/services/${id}`);
      if (res && res.data) {
        return {
          service: res.data as Service,
          related: res.related || [],
        };
      }
    } catch (err) {
      console.warn('[API Client] Backend unreachable, searching fallback service:', err);
    }

    const service =
      FALLBACK_SERVICES.find((s) => s._id === id || s.name.toLowerCase().includes(id.toLowerCase())) ||
      FALLBACK_SERVICES[0];
    const related = FALLBACK_SERVICES.filter(
      (s) => s._id !== service._id && s.category === service.category
    ).slice(0, 3);
    return { service, related };
  }

  async createService(data: Partial<Service>): Promise<Service> {
    const res = await this.request<Service>('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data!;
  }

  async updateService(id: string, data: Partial<Service>): Promise<Service> {
    const res = await this.request<Service>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.data!;
  }

  async deleteService(id: string): Promise<void> {
    await this.request<void>(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // GALLERY
  async getGallery(category?: string, beforeAfter?: boolean): Promise<GalleryItem[]> {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'All') params.append('category', category);
      if (beforeAfter) params.append('beforeAfter', 'true');

      const res = await this.request<GalleryItem[]>(`/gallery?${params.toString()}`);
      if (res && res.data && res.data.length > 0) {
        return res.data;
      }
    } catch (err) {
      console.warn('[API Client] Backend unreachable, serving fallback gallery:', err);
    }

    let filtered = [...FALLBACK_GALLERY];
    if (category && category !== 'All') {
      filtered = filtered.filter((g) => g.category.toLowerCase() === category.toLowerCase());
    }
    if (beforeAfter !== undefined) {
      filtered = filtered.filter((g) => g.isBeforeAfter === beforeAfter);
    }
    return filtered;
  }

  async createGallery(data: Partial<GalleryItem>): Promise<GalleryItem> {
    const res = await this.request<GalleryItem>('/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data!;
  }

  async updateGallery(id: string, data: Partial<GalleryItem>): Promise<GalleryItem> {
    const res = await this.request<GalleryItem>(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.data!;
  }

  async deleteGallery(id: string): Promise<void> {
    await this.request<void>(`/gallery/${id}`, {
      method: 'DELETE',
    });
  }

  // OFFERS
  async getOffers(all = false): Promise<Offer[]> {
    try {
      const res = await this.request<Offer[]>(`/offers${all ? '?all=true' : ''}`);
      if (res && res.data && res.data.length > 0) {
        return res.data;
      }
    } catch (err) {
      console.warn('[API Client] Backend unreachable, serving fallback offers:', err);
    }
    return FALLBACK_OFFERS;
  }

  async createOffer(data: Partial<Offer>): Promise<Offer> {
    const res = await this.request<Offer>('/offers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data!;
  }

  async updateOffer(id: string, data: Partial<Offer>): Promise<Offer> {
    const res = await this.request<Offer>(`/offers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.data!;
  }

  async deleteOffer(id: string): Promise<void> {
    await this.request<void>(`/offers/${id}`, {
      method: 'DELETE',
    });
  }

  // TESTIMONIALS
  async getTestimonials(all = false): Promise<Testimonial[]> {
    try {
      const res = await this.request<Testimonial[]>(`/testimonials${all ? '?all=true' : ''}`);
      if (res && res.data && res.data.length > 0) {
        return res.data;
      }
    } catch (err) {
      console.warn('[API Client] Backend unreachable, serving fallback testimonials:', err);
    }
    return FALLBACK_TESTIMONIALS;
  }

  async createTestimonial(data: Partial<Testimonial>): Promise<Testimonial> {
    const res = await this.request<Testimonial>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data!;
  }

  async updateTestimonialStatus(id: string, isApproved: boolean): Promise<Testimonial> {
    const res = await this.request<Testimonial>(`/testimonials/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isApproved }),
    });
    return res.data!;
  }

  async deleteTestimonial(id: string): Promise<void> {
    await this.request<void>(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // APPOINTMENTS
  async createAppointment(input: AppointmentInput): Promise<{
    appointment: Appointment;
    bookingRef: string;
    whatsappUrl: string;
    message: string;
  }> {
    try {
      const res = await this.request<Appointment>('/appointments', {
        method: 'POST',
        body: JSON.stringify(input),
      });
      return {
        appointment: res.data!,
        bookingRef: res.bookingRef || 'LUXE',
        whatsappUrl: res.whatsappUrl || '',
        message: res.message || 'Appointment requested successfully.',
      };
    } catch (err) {
      console.warn('[API Client] Backend booking endpoint unreachable, generating direct WhatsApp booking link:', err);
      const bookingRef = 'LX' + Math.floor(1000 + Math.random() * 9000);
      const salonPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919786149477';
      const msg = `Hello Luxe Salon! ✨\nI would like to book an appointment:\n\n*Name:* ${input.name}\n*Service:* ${input.service}\n*Date:* ${input.appointmentDate}\n*Time:* ${input.appointmentTime}\n*Phone:* ${input.phone}\n*Booking ID:* #${bookingRef}\n\nPlease confirm my appointment slot. Thank you!`;
      const whatsappUrl = `https://wa.me/${salonPhone}?text=${encodeURIComponent(msg)}`;
      return {
        appointment: {
          _id: bookingRef,
          name: input.name,
          email: input.email,
          phone: input.phone,
          service: input.service,
          appointmentDate: input.appointmentDate,
          appointmentTime: input.appointmentTime,
          message: input.message,
          notes: input.message,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        bookingRef,
        whatsappUrl,
        message: 'Your appointment request has been initiated. Click below to confirm via WhatsApp.',
      };
    }
  }

  async getAppointments(status?: string, date?: string, search?: string): Promise<Appointment[]> {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (date) params.append('date', date);
    if (search) params.append('search', search);

    const res = await this.request<Appointment[]>(`/appointments?${params.toString()}`);
    return res.data || [];
  }

  async getAppointmentById(id: string): Promise<Appointment> {
    const res = await this.request<Appointment>(`/appointments/${id}`);
    return res.data!;
  }

  async updateAppointmentStatus(id: string, status: string, notes?: string): Promise<Appointment> {
    const res = await this.request<Appointment>(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
    return res.data!;
  }

  async deleteAppointment(id: string): Promise<void> {
    await this.request<void>(`/appointments/${id}`, {
      method: 'DELETE',
    });
  }

  // CONTACT
  async createContactMessage(input: ContactInput): Promise<{ message: string; contact: ContactMessage }> {
    const res = await this.request<ContactMessage>('/contact', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    return {
      message: res.message || 'Message sent successfully.',
      contact: res.data!,
    };
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    const res = await this.request<ContactMessage[]>('/contact');
    return res.data || [];
  }

  async toggleContactRead(id: string, isRead: boolean): Promise<ContactMessage> {
    const res = await this.request<ContactMessage>(`/contact/${id}/read`, {
      method: 'PATCH',
      body: JSON.stringify({ isRead }),
    });
    return res.data!;
  }

  async deleteContactMessage(id: string): Promise<void> {
    await this.request<void>(`/contact/${id}`, {
      method: 'DELETE',
    });
  }

  // DASHBOARD
  async getDashboardStats(): Promise<DashboardStats> {
    const res = await this.request<DashboardStats>('/dashboard/stats');
    return res.data!;
  }

  // AUTH
  async adminLogin(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    const res = await this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.token && typeof window !== 'undefined') {
      localStorage.setItem('luxe_admin_token', res.token);
    }
    return {
      token: res.token!,
      user: res.user!,
    };
  }

  async adminGetMe(): Promise<AdminUser> {
    const res = await this.request<AdminUser>('/auth/me');
    return (res as any).user;
  }

  async adminLogout(): Promise<void> {
    try {
      await this.request<void>('/auth/logout', { method: 'POST' });
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('luxe_admin_token');
      }
    }
  }
}

export const api = new ApiClient(API_BASE_URL);
