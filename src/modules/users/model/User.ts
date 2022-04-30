import { Document } from 'mongoose';

interface User extends Document {
  name: string;
  cpf: string;
  email: string;
  password: string;
  admin: boolean;
}

export { User };
