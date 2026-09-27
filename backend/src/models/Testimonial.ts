import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  customerName: string;
  review: string;
  rating: number;
  image?: string;
  isApproved: boolean;
  serviceUsed?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema(
  {
    customerName: { type: String, required: true, trim: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    image: { type: String },
    isApproved: { type: Boolean, default: true, index: true },
    serviceUsed: { type: String },
    location: { type: String, default: 'Tiruppur' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
