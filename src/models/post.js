import mongoose, { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  body: String,
  likes: Number,
  replies: [
    {
      body: String,
      likes: Number,
    },
  ],
});

const PostSchema = new Schema({
  title: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [CommentSchema],
  likes: Number,
  payments: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
});

export default model('Post', PostSchema);
