import { Document } from 'mongoose';

interface Brand extends Document {
  name: string;
  description?: string;
}

export { Brand };
