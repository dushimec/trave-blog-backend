import { Schema, model } from 'mongoose';

const comentSchema = new Schema({
  post: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default model('Comment', comentSchema);
