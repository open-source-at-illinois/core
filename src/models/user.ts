import mongoose from 'mongoose';

export interface UserType {
  netid?: string;
  verified: boolean;
  discordId: string;
  github?: string;
  points: number;
}

const userSchema = new mongoose.Schema<UserType>({
  netid: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  discordId: {
    type: String,
    unique: true,
    required: true,
  },
  github: {
    type: String,
    unique: true,
    required: false,
    sparse: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
