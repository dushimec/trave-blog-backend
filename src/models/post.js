import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ body: String, likes: Number }],
  likes: Number,
});

export default model('Post', postSchema);
