# LUXE SALON — Premium Unisex Salon & Bridal Sanctuary

> “Where Beauty Meets Luxury” • Tiruppur, Tamil Nadu, India

Production-ready fullstack web platform for **LUXE SALON**, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Express.js REST API, and MongoDB with Mongoose ODM.

---

## 💎 Design System & Aesthetic

- **Background Palette**: Ivory & Cream (`#FAF7F2`, `#F4EFE6`, `#EDE5D8`)
- **Typography Palette**: Deep Charcoal (`#141413`) with Cormorant Garamond / Italiana serif headlines & Inter body
- **Accents**: Champagne Gold (`#C5A880`, `#D4AF37`, `#A3845A`)
- **Visuals**: High-fashion editorial photography, minimal rounded corners, subtle champagne borders, and glassmorphic navbar.

---

## 🚀 Tech Stack

### Frontend (`/frontend`)
- **Next.js 14+** (App Router)
- **React 18** & **TypeScript**
- **Tailwind CSS** (Custom luxury token system)
- **Framer Motion** (Editorial fade-up, reveals, page transitions)
- **Lucide React** (Minimal icons)
- **Canvas Confetti** (Booking celebration)

### Backend (`/backend`)
- **Node.js** & **Express.js** (REST API architecture)
- **MongoDB** & **Mongoose ODM** (With zero-config embedded fallback)
- **JWT Authentication** & **Bcrypt** password hashing
- **Security**: Helmet, CORS, Express Rate Limiting, Input Sanitization

---

## 📁 Directory Structure

```
/
├── backend/
│   ├── src/
│   │   ├── config/          # MongoDB connection & fallback
│   │   ├── controllers/     # Services, Gallery, Offers, Appointments, Auth, Contact, Dashboard
│   │   ├── middleware/      # JWT auth, centralized error handler, rate limiters
│   │   ├── models/          # Service, Gallery, Offer, Testimonial, Appointment, ContactMessage, AdminUser
│   │   ├── routes/          # Express REST routes
│   │   ├── seeds/           # Automatic database seeder with rich luxury salon data
│   │   └── server.ts        # Express entry point
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx       # Root layout + SEO + LocalBusiness JSON-LD schema
│   │   ├── page.tsx         # Home page (All 11 luxury sections)
│   │   ├── about/           # About & Master Stylists page
│   │   ├── services/        # Categorized Services menu with search & filters
│   │   │   └── [id]/        # Service detail view with treatment protocol & booking embed
│   │   ├── gallery/         # Portfolio & interactive Before/After sliders
│   │   ├── offers/          # Curated packages with savings calculations
│   │   ├── contact/         # Location, opening hours, Google Maps, contact form
│   │   ├── book/            # Dedicated luxury appointment booking studio
│   │   ├── admin/           # Protected admin dashboard
│   │   │   └── login/       # Admin authentication
│   │   ├── robots.ts        # Dynamic robots.txt
│   │   └── sitemap.ts       # Dynamic sitemap.xml
│   ├── components/
│   │   ├── booking/         # AppointmentForm with live validation & WhatsApp link
│   │   ├── gallery/         # GalleryCard
│   │   ├── home/            # Hero, AboutPreview, FeaturedExperience, WhyChooseLuxe, TransformationSection, etc.
│   │   ├── layout/          # Navbar, Footer
│   │   ├── offers/          # OfferCard
│   │   ├── services/        # ServiceCard
│   │   └── ui/              # Button, SectionHeading, Lightbox, BeforeAfterSlider, Modal, Toast, Loader, EmptyState
│   ├── lib/
│   │   ├── api.ts           # Centralized typed API client
│   │   └── utils.ts         # Formatting, currency, date, WhatsApp generator
│   ├── types/               # TypeScript interfaces
│   ├── .env.local
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
└── package.json             # Root scripts
```

---

## 🔑 Administrator Credentials

- **Admin Login URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@luxesalon.com`
- **Password**: `LuxeAdmin2026!`

The Admin Dashboard provides full management for:
1. **Overview**: Real-time KPI counters (Bookings, Pending, Confirmed, Services, Offers, Inquiries)
2. **Appointments**: Status changer (`pending`, `confirmed`, `completed`, `cancelled`), notes, deletion, instant WhatsApp response
3. **Services**: Create, update, toggle active, delete
4. **Gallery**: Add high-res visual portfolio items & Before/After sets
5. **Offers**: Create seasonal packages with validity & discount percentages
6. **Reviews**: Moderate & approve public testimonials
7. **Inquiries**: Read, toggle read status, and manage contact inquiries

---

## ⚡ How to Run Locally

### 1. Start the Backend API (Port 5000)
```bash
cd backend
npm run dev
```
*Health Check: `http://localhost:5000/api/health`*

### 2. Start the Frontend Next.js App (Port 3000)
```bash
cd frontend
npm run dev
```
*Access Website: `http://localhost:3000`*

---

## 📱 WhatsApp Integration
When a guest completes a booking request, the platform automatically generates an instant WhatsApp pre-formatted reservation text directed to the salon concierge with client details, chosen date/time, and generated Booking ID reference.
