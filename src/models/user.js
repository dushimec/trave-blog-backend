import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  payments: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
});

export default model('User', userSchema);
