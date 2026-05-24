import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
