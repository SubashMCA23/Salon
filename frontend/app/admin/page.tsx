'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Scissors,
  Image as ImageIcon,
  Tag,
  MessageSquare,
  Star,
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
  LogOut,
  RefreshCw,
  Search,
  SlidersHorizontal,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Loader } from '@/components/ui/Loader';
import { useToast } from '@/components/ui/ToastContext';
import { api } from '@/lib/api';
import {
  DashboardStats,
  Appointment,
  Service,
  GalleryItem,
  Offer,
  Testimonial,
  ContactMessage,
  AdminUser,
} from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { success, error } = useToast();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'appointments' | 'services' | 'gallery' | 'offers' | 'testimonials' | 'messages'
  >('overview');

  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters for appointments
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Modals state
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [newServiceData, setNewServiceData] = useState({
    name: '',
    category: 'HAIR',
    description: '',
    price: 1200,
    duration: '60 mins',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1200&auto=format&fit=crop',
    isFeatured: false,
  });

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [newGalleryData, setNewGalleryData] = useState({
    title: '',
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1200&auto=format&fit=crop',
    description: '',
  });

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [newOfferData, setNewOfferData] = useState({
    name: '',
    description: '',
    services: 'Haircut, Hair Spa, Blow Dry',
    price: 4500,
    discountPrice: 2999,
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1200&auto=format&fit=crop',
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    badge: 'Special Offer',
  });

  // Verify Admin Auth
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await api.adminGetMe();
        setAdminUser(user);
        loadAllData();
      } catch (err) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('luxe_admin_token');
        }
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  const loadAllData = useCallback(async () => {
    setRefreshing(true);
    try {
      const [statsData, apptsData, srvsData, galData, offData, testData, msgData] = await Promise.all([
        api.getDashboardStats().catch(() => null),
        api.getAppointments().catch(() => []),
        api.getServices(undefined, undefined, false).catch(() => []),
        api.getGallery().catch(() => []),
        api.getOffers(true).catch(() => []),
        api.getTestimonials(true).catch(() => []),
        api.getContactMessages().catch(() => []),
      ]);

      if (statsData) setStats(statsData);
      setAppointments(apptsData);
      setServices(srvsData);
      setGallery(galData);
      setOffers(offData);
      setTestimonials(testData);
      setMessages(msgData);
    } catch (err: any) {
      error('Data Refresh Failed', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [error]);

  const handleLogout = async () => {
    await api.adminLogout();
    success('Logged Out', 'You have been signed out.');
    router.push('/admin/login');
  };

  // Appointment Status Updater
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await api.updateAppointmentStatus(id, newStatus);
      success('Status Updated', `Appointment marked as ${newStatus}`);
      loadAllData();
    } catch (err: any) {
      error('Update Failed', err.message);
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await api.deleteAppointment(id);
      success('Removed', 'Appointment record deleted.');
      loadAllData();
    } catch (err: any) {
      error('Delete Failed', err.message);
    }
  };

  // Services Handler
  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createService(newServiceData as any);
      success('Service Created', 'New service added to catalog.');
      setIsServiceModalOpen(false);
      loadAllData();
    } catch (err: any) {
      error('Creation Failed', err.message);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await api.deleteService(id);
      success('Deleted', 'Service removed from catalog.');
      loadAllData();
    } catch (err: any) {
      error('Delete Failed', err.message);
    }
  };

  // Gallery Handler
  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createGallery(newGalleryData as any);
      success('Visual Added', 'New portfolio visual published.');
      setIsGalleryModalOpen(false);
      loadAllData();
    } catch (err: any) {
      error('Creation Failed', err.message);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm('Delete this visual item?')) return;
    try {
      await api.deleteGallery(id);
      success('Visual Deleted', 'Item removed from gallery.');
      loadAllData();
    } catch (err: any) {
      error('Delete Failed', err.message);
    }
  };

  // Offers Handler
  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const servicesArray = newOfferData.services.split(',').map((s) => s.trim());
      await api.createOffer({
        ...newOfferData,
        services: servicesArray,
        validUntil: new Date(newOfferData.validUntil).toISOString(),
      });
      success('Package Created', 'New seasonal package created.');
      setIsOfferModalOpen(false);
      loadAllData();
    } catch (err: any) {
      error('Creation Failed', err.message);
    }
  };

  const handleDeleteOffer = async (id: string) => {
    if (!window.confirm('Delete this package?')) return;
    try {
      await api.deleteOffer(id);
      success('Package Removed', 'Offer deleted.');
      loadAllData();
    } catch (err: any) {
      error('Delete Failed', err.message);
    }
  };

  // Testimonials Handler
  const handleToggleTestimonial = async (id: string, isApproved: boolean) => {
    try {
      await api.updateTestimonialStatus(id, isApproved);
      success('Review Status Updated', isApproved ? 'Review Approved & Published' : 'Review Hidden');
      loadAllData();
    } catch (err: any) {
      error('Update Failed', err.message);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.deleteTestimonial(id);
      success('Deleted', 'Testimonial removed.');
      loadAllData();
    } catch (err: any) {
      error('Delete Failed', err.message);
    }
  };

  // Contact Message Toggle Read
  const handleToggleMessageRead = async (id: string, currentRead: boolean) => {
    try {
      await api.toggleContactRead(id, !currentRead);
      loadAllData();
    } catch (err: any) {
      error('Update Failed', err.message);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Delete this contact message?')) return;
    try {
      await api.deleteContactMessage(id);
      success('Deleted', 'Message deleted.');
      loadAllData();
    } catch (err: any) {
      error('Delete Failed', err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxe-ivory">
        <Loader message="Verifying session credentials..." />
      </div>
    );
  }

  // Filtered Appointments
  const filteredAppointments = appointments.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch =
      !searchFilter ||
      app.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      app.service.toLowerCase().includes(searchFilter.toLowerCase()) ||
      app.phone.includes(searchFilter);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-luxe-ivory text-luxe-charcoal">
      {/* Top Admin Navigation */}
      <header className="bg-luxe-charcoal text-white border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-luxe-gold" />
            <div>
              <h1 className="font-serif text-xl tracking-wider text-white">
                LUXE SALON <span className="text-luxe-gold font-light">ADMIN</span>
              </h1>
              <p className="text-[10px] text-stone-400 font-light -mt-0.5">
                Tiruppur Studio Management Console
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={loadAllData}
              className={`p-2 text-stone-400 hover:text-white transition-colors ${refreshing ? 'animate-spin' : ''}`}
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <span className="text-xs text-stone-300 hidden sm:inline-block font-light">
              Logged in: <strong className="text-luxe-gold font-normal">{adminUser?.name || 'Administrator'}</strong>
            </span>

            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              leftIcon={<LogOut className="w-3.5 h-3.5" />}
              className="text-white border-white/30 hover:bg-white/10"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 border-t border-white/5">
          {[
            { id: 'overview', label: 'Overview', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
            { id: 'appointments', label: `Appointments (${appointments.length})`, icon: <Calendar className="w-3.5 h-3.5" /> },
            { id: 'services', label: `Services (${services.length})`, icon: <Scissors className="w-3.5 h-3.5" /> },
            { id: 'gallery', label: `Gallery (${gallery.length})`, icon: <ImageIcon className="w-3.5 h-3.5" /> },
            { id: 'offers', label: `Offers (${offers.length})`, icon: <Tag className="w-3.5 h-3.5" /> },
            { id: 'testimonials', label: `Reviews (${testimonials.length})`, icon: <Star className="w-3.5 h-3.5" /> },
            { id: 'messages', label: `Messages (${messages.filter((m) => !m.isRead).length} new)`, icon: <MessageSquare className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-luxe-gold text-luxe-charcoal font-semibold shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="p-5 bg-white border border-luxe-border">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold block">Total Bookings</span>
                <p className="font-serif text-3xl text-luxe-charcoal mt-1">{stats?.totalAppointments || appointments.length}</p>
              </div>

              <div className="p-5 bg-white border border-amber-200 bg-amber-50/30">
                <span className="text-[10px] uppercase tracking-widest text-amber-800 font-semibold block">Pending Action</span>
                <p className="font-serif text-3xl text-amber-900 mt-1">{appointments.filter((a) => a.status === 'pending').length}</p>
              </div>

              <div className="p-5 bg-white border border-emerald-200 bg-emerald-50/30">
                <span className="text-[10px] uppercase tracking-widest text-emerald-800 font-semibold block">Confirmed</span>
                <p className="font-serif text-3xl text-emerald-900 mt-1">{appointments.filter((a) => a.status === 'confirmed').length}</p>
              </div>

              <div className="p-5 bg-white border border-luxe-border">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold block">Active Services</span>
                <p className="font-serif text-3xl text-luxe-charcoal mt-1">{services.filter((s) => s.isActive).length}</p>
              </div>

              <div className="p-5 bg-white border border-luxe-border">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold block">Active Offers</span>
                <p className="font-serif text-3xl text-luxe-charcoal mt-1">{offers.filter((o) => o.isActive).length}</p>
              </div>

              <div className="p-5 bg-white border border-luxe-border">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold block">Unread Inquiries</span>
                <p className="font-serif text-3xl text-luxe-gold-dark mt-1">{messages.filter((m) => !m.isRead).length}</p>
              </div>
            </div>

            {/* Quick Recent Appointments Overview */}
            <div className="bg-white border border-luxe-border p-6 shadow-subtle">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-luxe-border">
                <div>
                  <h3 className="font-serif text-2xl text-luxe-charcoal">Recent Appointment Requests</h3>
                  <p className="text-xs text-luxe-muted">Latest bookings requiring concierge coordination</p>
                </div>
                <Button onClick={() => setActiveTab('appointments')} variant="outline" size="sm">
                  View All Appointments
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-luxe-border text-stone-500 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Date & Slot</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-luxe-border/50">
                    {appointments.slice(0, 5).map((app) => (
                      <tr key={app._id} className="hover:bg-luxe-cream/30">
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-luxe-charcoal">{app.name}</p>
                          <p className="text-stone-500 text-[11px]">{app.phone}</p>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-luxe-charcoal">{app.service}</td>
                        <td className="py-3.5 px-4 text-stone-700">
                          {formatDate(app.appointmentDate)} <br />
                          <span className="text-stone-500 font-mono text-[11px]">{app.appointmentTime}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider ${
                              app.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : app.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : app.status === 'cancelled'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {app.status === 'pending' && (
                            <button
                              onClick={() => handleUpdateStatus(app._id, 'confirmed')}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px] uppercase tracking-wider mr-2"
                            >
                              Confirm
                            </button>
                          )}
                          <a
                            href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(app.name)},%20this%20is%20Luxe%20Salon%20Tiruppur%20regarding%20your%20appointment.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:underline text-xs"
                          >
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 border border-luxe-border">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">Status:</span>
                {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 text-xs uppercase tracking-wider font-semibold transition-colors ${
                      statusFilter === st
                        ? 'bg-luxe-charcoal text-luxe-gold'
                        : 'bg-luxe-cream/50 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter name, phone, service..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-luxe-cream/30 border border-luxe-border outline-none focus:border-luxe-gold"
                />
              </div>
            </div>

            <div className="bg-white border border-luxe-border overflow-x-auto shadow-subtle">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-luxe-border text-stone-500 uppercase tracking-wider text-[10px] bg-luxe-cream/30">
                    <th className="py-3 px-4">Booking Ref & Date</th>
                    <th className="py-3 px-4">Client Details</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Slot</th>
                    <th className="py-3 px-4">Notes / Request</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-luxe-border/50">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-stone-400">
                        No appointments found matching current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((app) => (
                      <tr key={app._id} className="hover:bg-luxe-cream/20">
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-luxe-charcoal block">
                            #{app._id.slice(-6).toUpperCase()}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            Booked on {formatDate(app.createdAt)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-luxe-charcoal">{app.name}</p>
                          <p className="text-stone-500">{app.phone}</p>
                          <p className="text-[11px] text-stone-400">{app.email}</p>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-luxe-charcoal">{app.service}</td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-luxe-charcoal">{formatDate(app.appointmentDate)}</p>
                          <p className="font-mono text-stone-500">{app.appointmentTime}</p>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs text-stone-600 font-light truncate">
                          {app.message || 'None'}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={app.status}
                            onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                            className={`px-2 py-1 text-[11px] uppercase font-bold tracking-wider outline-none border cursor-pointer ${
                              app.status === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : app.status === 'completed'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : app.status === 'cancelled'
                                ? 'bg-rose-50 text-rose-800 border-rose-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <a
                            href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(app.name)},%20this%20is%20Luxe%20Salon%20Tiruppur%20regarding%20your%20appointment%20on%20${encodeURIComponent(formatDate(app.appointmentDate))}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-emerald-600 hover:text-emerald-800 inline-block"
                            title="Chat on WhatsApp"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleDeleteAppointment(app._id)}
                            className="p-1.5 text-rose-500 hover:text-rose-700"
                            title="Delete record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-luxe-charcoal">Services Catalog</h3>
                <p className="text-xs text-luxe-muted">Manage hair, skin, bridal and grooming treatments</p>
              </div>
              <Button
                onClick={() => setIsServiceModalOpen(true)}
                variant="primary"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Add New Service
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv) => (
                <div key={srv._id} className="bg-white border border-luxe-border p-5 flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 w-full bg-stone-100 mb-4 overflow-hidden">
                      <Image src={srv.image} alt={srv.name} fill className="object-cover" />
                      <span className="absolute top-2 left-2 bg-luxe-charcoal text-luxe-gold text-[9px] uppercase tracking-widest px-2 py-0.5 font-semibold">
                        {srv.category}
                      </span>
                    </div>

                    <h4 className="font-serif text-xl text-luxe-charcoal">{srv.name}</h4>
                    <p className="text-xs text-luxe-muted font-light mt-1 line-clamp-2">{srv.description}</p>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="font-semibold text-luxe-charcoal">{formatCurrency(srv.price)}</span>
                      <span className="text-stone-500 font-mono">{srv.duration}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-luxe-border flex items-center justify-between">
                    <span className={`text-[10px] uppercase font-bold ${srv.isActive ? 'text-emerald-700' : 'text-stone-400'}`}>
                      {srv.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => handleDeleteService(srv._id)}
                      className="text-rose-500 hover:text-rose-700 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-luxe-charcoal">Portfolio Visuals</h3>
                <p className="text-xs text-luxe-muted">Manage high-definition portfolio and transformation pictures</p>
              </div>
              <Button
                onClick={() => setIsGalleryModalOpen(true)}
                variant="primary"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Add Portfolio Photo
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div key={item._id} className="bg-white border border-luxe-border p-3">
                  <div className="relative h-48 w-full bg-stone-100 overflow-hidden mb-2">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                    <span className="absolute top-2 left-2 bg-black/70 text-white text-[9px] uppercase px-2 py-0.5 font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <p className="font-serif text-sm font-semibold truncate text-luxe-charcoal">{item.title}</p>
                  <div className="mt-2 flex justify-between items-center text-xs">
                    <span className="text-[10px] text-stone-500">{item.isBeforeAfter ? 'Transformation' : 'Standard'}</span>
                    <button
                      onClick={() => handleDeleteGallery(item._id)}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: OFFERS */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-luxe-charcoal">Seasonal Offers & Packages</h3>
                <p className="text-xs text-luxe-muted">Manage multi-service indulgence packages</p>
              </div>
              <Button
                onClick={() => setIsOfferModalOpen(true)}
                variant="primary"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Create New Package
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div key={offer._id} className="bg-white border border-luxe-border p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-luxe-gold-dark font-semibold">
                      {offer.badge || 'PACKAGE'}
                    </span>
                    <h4 className="font-serif text-2xl text-luxe-charcoal mt-1">{offer.name}</h4>
                    <p className="text-xs text-luxe-muted font-light mt-1">{offer.description}</p>
                    <div className="mt-3 p-3 bg-luxe-cream/50 border border-luxe-border flex items-center justify-between">
                      <span className="text-xs line-through text-stone-400">{formatCurrency(offer.price)}</span>
                      <span className="font-serif text-xl font-bold text-luxe-charcoal">
                        {formatCurrency(offer.discountPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-luxe-border flex items-center justify-between">
                    <span className="text-[10px] text-stone-500">Valid until {formatDate(offer.validUntil)}</span>
                    <button
                      onClick={() => handleDeleteOffer(offer._id)}
                      className="text-rose-500 hover:text-rose-700 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-luxe-charcoal">Client Reviews & Testimonials</h3>
                <p className="text-xs text-luxe-muted">Moderate and approve customer feedback</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t._id} className="bg-white border border-luxe-border p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex text-luxe-gold">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-luxe-gold" />
                        ))}
                      </div>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 ${t.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {t.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-xs text-luxe-charcoal italic leading-relaxed">“{t.review}”</p>
                    <p className="text-xs font-semibold text-luxe-charcoal mt-3">{t.customerName}</p>
                    {t.serviceUsed && <p className="text-[10px] text-luxe-gold-dark">{t.serviceUsed}</p>}
                  </div>

                  <div className="mt-4 pt-3 border-t border-luxe-border flex items-center justify-between">
                    <button
                      onClick={() => handleToggleTestimonial(t._id, !t.isApproved)}
                      className="text-xs text-stone-700 hover:text-luxe-gold font-medium"
                    >
                      {t.isApproved ? 'Hide Review' : 'Approve Review'}
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(t._id)}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-luxe-charcoal">Guest Inquiries</h3>
                <p className="text-xs text-luxe-muted">Messages received through the contact desk</p>
              </div>
            </div>

            <div className="bg-white border border-luxe-border divide-y divide-luxe-border shadow-subtle">
              {messages.length === 0 ? (
                <div className="p-8 text-center text-stone-400 text-xs">No contact messages received yet.</div>
              ) : (
                messages.map((m) => (
                  <div key={m._id} className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${!m.isRead ? 'bg-amber-50/40' : ''}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-luxe-charcoal">{m.name}</span>
                        <span className="text-stone-400 text-xs">• {m.email}</span>
                        {m.phone && <span className="text-stone-400 text-xs">• {m.phone}</span>}
                        {!m.isRead && (
                          <span className="px-2 py-0.5 bg-luxe-gold text-luxe-charcoal text-[9px] uppercase font-bold">
                            New
                          </span>
                        )}
                      </div>
                      <h5 className="font-serif text-base text-luxe-charcoal font-semibold">{m.subject || 'General Inquiry'}</h5>
                      <p className="text-xs text-stone-700 font-light mt-1 leading-relaxed">{m.message}</p>
                      <span className="text-[10px] text-stone-400 block mt-2">{formatDate(m.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleMessageRead(m._id, m.isRead)}
                        className="px-3 py-1.5 border border-luxe-border text-xs uppercase font-medium hover:bg-luxe-cream"
                      >
                        {m.isRead ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(m._id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* MODAL: ADD NEW SERVICE */}
      <Modal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title="Add New Salon Service"
        subtitle="Expand the Luxe Salon menu"
      >
        <form onSubmit={handleCreateService} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1">Service Name *</label>
            <input
              type="text"
              required
              value={newServiceData.name}
              onChange={(e) => setNewServiceData({ ...newServiceData, name: e.target.value })}
              className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none focus:border-luxe-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Category *</label>
              <select
                value={newServiceData.category}
                onChange={(e) => setNewServiceData({ ...newServiceData, category: e.target.value })}
                className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none"
              >
                <option value="HAIR">HAIR</option>
                <option value="BEAUTY">BEAUTY</option>
                <option value="BRIDAL & OCCASIONS">BRIDAL & OCCASIONS</option>
                <option value="MEN'S GROOMING">MEN&apos;S GROOMING</option>
              </select>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Price (₹) *</label>
              <input
                type="number"
                required
                value={newServiceData.price}
                onChange={(e) => setNewServiceData({ ...newServiceData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Duration *</label>
              <input
                type="text"
                required
                value={newServiceData.duration}
                onChange={(e) => setNewServiceData({ ...newServiceData, duration: e.target.value })}
                className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Image URL *</label>
              <input
                type="url"
                required
                value={newServiceData.image}
                onChange={(e) => setNewServiceData({ ...newServiceData, image: e.target.value })}
                className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1">Description *</label>
            <textarea
              rows={3}
              required
              value={newServiceData.description}
              onChange={(e) => setNewServiceData({ ...newServiceData, description: e.target.value })}
              className="w-full p-3 border border-luxe-border bg-luxe-cream/30 outline-none resize-none"
            />
          </div>

          <Button type="submit" variant="gold" size="md" className="w-full mt-4">
            Create Service
          </Button>
        </form>
      </Modal>

      {/* MODAL: ADD GALLERY PHOTO */}
      <Modal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        title="Publish Portfolio Visual"
        subtitle="Add editorial photo to gallery"
      >
        <form onSubmit={handleCreateGallery} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1">Title *</label>
            <input
              type="text"
              required
              value={newGalleryData.title}
              onChange={(e) => setNewGalleryData({ ...newGalleryData, title: e.target.value })}
              className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1">Category *</label>
            <select
              value={newGalleryData.category}
              onChange={(e) => setNewGalleryData({ ...newGalleryData, category: e.target.value })}
              className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none"
            >
              <option value="Hair">Hair</option>
              <option value="Beauty">Beauty</option>
              <option value="Bridal">Bridal</option>
              <option value="Men">Men</option>
              <option value="Salon">Salon</option>
            </select>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1">Image URL *</label>
            <input
              type="url"
              required
              value={newGalleryData.image}
              onChange={(e) => setNewGalleryData({ ...newGalleryData, image: e.target.value })}
              className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1">Description (Optional)</label>
            <textarea
              rows={2}
              value={newGalleryData.description}
              onChange={(e) => setNewGalleryData({ ...newGalleryData, description: e.target.value })}
              className="w-full p-3 border border-luxe-border bg-luxe-cream/30 outline-none resize-none"
            />
          </div>

          <Button type="submit" variant="gold" size="md" className="w-full mt-4">
            Upload Visual
          </Button>
        </form>
      </Modal>

      {/* MODAL: CREATE PACKAGE */}
      <Modal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        title="Create Seasonal Package"
        subtitle="Bundle treatments with promotional tariff"
      >
        <form onSubmit={handleCreateOffer} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1">Package Name *</label>
            <input
              type="text"
              required
              value={newOfferData.name}
              onChange={(e) => setNewOfferData({ ...newOfferData, name: e.target.value })}
              className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Original Price (₹) *</label>
              <input
                type="number"
                required
                value={newOfferData.price}
                onChange={(e) => setNewOfferData({ ...newOfferData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Discounted Price (₹) *</label>
              <input
                type="number"
                required
                value={newOfferData.discountPrice}
                onChange={(e) => setNewOfferData({ ...newOfferData, discountPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1">Included Services (Comma separated) *</label>
            <input
              type="text"
              required
              value={newOfferData.services}
              onChange={(e) => setNewOfferData({ ...newOfferData, services: e.target.value })}
              placeholder="e.g. Haircut, Hair Spa, Facial, Manicure"
              className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1">Image URL *</label>
            <input
              type="url"
              required
              value={newOfferData.image}
              onChange={(e) => setNewOfferData({ ...newOfferData, image: e.target.value })}
              className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Valid Until Date *</label>
              <input
                type="date"
                required
                value={newOfferData.validUntil}
                onChange={(e) => setNewOfferData({ ...newOfferData, validUntil: e.target.value })}
                className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Badge Tag</label>
              <input
                type="text"
                value={newOfferData.badge}
                onChange={(e) => setNewOfferData({ ...newOfferData, badge: e.target.value })}
                placeholder="e.g. Most Loved, Festive Special"
                className="w-full px-3 py-2 border border-luxe-border bg-luxe-cream/30 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1">Description *</label>
            <textarea
              rows={2}
              required
              value={newOfferData.description}
              onChange={(e) => setNewOfferData({ ...newOfferData, description: e.target.value })}
              className="w-full p-3 border border-luxe-border bg-luxe-cream/30 outline-none resize-none"
            />
          </div>

          <Button type="submit" variant="gold" size="md" className="w-full mt-4">
            Publish Package
          </Button>
        </form>
      </Modal>
    </div>
  );
}
