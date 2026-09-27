import mongoose, { Schema, Document } from 'mongoose';

export interface IOffer extends Document {
  name: string;
  description: string;
  services: string[];
  price: number;
  discountPrice: number;
  image: string;
  validUntil: Date;
  isActive: boolean;
  badge?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OfferSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    services: [{ type: String, required: true }],
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    validUntil: { type: Date, required: true, index: true },
    isActive: { type: Boolean, default: true, index: true },
    badge: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOffer>('Offer', OfferSchema);
