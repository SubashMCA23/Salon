import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  name: string;
  phone: string;
  email: string;
  service: string;
  appointmentDate: Date;
  appointmentTime: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    service: { type: String, required: true, trim: true },
    appointmentDate: { type: Date, required: true, index: true },
    appointmentTime: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);
