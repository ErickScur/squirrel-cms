import { Document } from 'mongoose';

interface Category extends Document {
  name: string;
  description?: string;
}

export { Category };
