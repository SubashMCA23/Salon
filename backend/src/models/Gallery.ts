import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  category: 'Hair' | 'Beauty' | 'Bridal' | 'Men' | 'Salon';
  image: string;
  isBeforeAfter: boolean;
  beforeImage?: string;
  afterImage?: string;
  description?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Hair', 'Beauty', 'Bridal', 'Men', 'Salon'],
      index: true,
    },
    image: { type: String, required: true },
    isBeforeAfter: { type: Boolean, default: false, index: true },
    beforeImage: { type: String },
    afterImage: { type: String },
    description: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGallery>('Gallery', GallerySchema);
