import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const User = model('User', userSchema);

export default User;
