import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  category: 'HAIR' | 'BEAUTY' | 'BRIDAL & OCCASIONS' | 'MEN\'S GROOMING';
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
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ['HAIR', 'BEAUTY', 'BRIDAL & OCCASIONS', 'MEN\'S GROOMING'],
      index: true,
    },
    subCategory: { type: String, trim: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    price: { type: Number, required: true, min: 0 },
    startingPrice: { type: Boolean, default: false },
    duration: { type: String, required: true },
    image: { type: String, required: true },
    isActive: { type: Boolean, default: true, index: true },
    isFeatured: { type: Boolean, default: false },
    benefits: [{ type: String }],
    processSteps: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IService>('Service', ServiceSchema);
