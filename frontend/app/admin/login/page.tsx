'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Lock, Mail, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastContext';
import { api } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const { success, error } = useToast();

  const [email, setEmail] = useState('admin@luxesalon.com');
  const [password, setPassword] = useState('LuxeAdmin2026!');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('luxe_admin_token');
    if (token) {
      router.push('/admin');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      error('Credentials Required', 'Please enter your administrator email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.adminLogin(email, password);
      success('Authentication Successful', `Welcome back, ${res.user.name}`);
      router.push('/admin');
    } catch (err: any) {
      error('Login Failed', err.message || 'Invalid administrator credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-luxe-ivory py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-luxe-border p-8 sm:p-10 shadow-card">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-luxe-charcoal mx-auto flex items-center justify-center text-luxe-gold mb-4 border border-luxe-gold/30">
            <Shield className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-luxe-gold-dark font-semibold">
            SECURE MANAGEMENT PORTAL
          </span>
          <h2 className="font-serif text-3xl text-luxe-charcoal mt-1">
            Luxe Admin Login
          </h2>
          <p className="text-xs text-luxe-muted font-light mt-1">
            Access appointment requests, services catalog, and salon metrics.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-luxe-charcoal font-medium mb-2">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-luxe-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@luxesalon.com"
                className="w-full pl-10 pr-4 py-3 bg-luxe-cream/30 border border-luxe-border focus:border-luxe-gold text-xs text-luxe-charcoal outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-luxe-charcoal font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-luxe-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-luxe-cream/30 border border-luxe-border focus:border-luxe-gold text-xs text-luxe-charcoal outline-none transition-colors"
              />
            </div>
          </div>

          <div className="p-3 bg-luxe-cream/60 border border-luxe-border text-[11px] text-stone-600 font-light">
            <span className="font-semibold text-luxe-charcoal">Demo Credentials:</span> <br />
            Email: <code className="text-luxe-gold-dark font-mono">admin@luxesalon.com</code> <br />
            Password: <code className="text-luxe-gold-dark font-mono">LuxeAdmin2026!</code>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full justify-center mt-2"
          >
            Sign In to Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}
