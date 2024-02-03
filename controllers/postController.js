const Post = require('../models/post');

const createPost = async (req, res) => {
  try {
    const { title, content,userId } = req.body;
    const post = new Post({ title, content, author:userId  });
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editPost = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: id, author: req.user.userId },
      { $set: req.body },
      { new: true }
    ).populate('author', 'username');

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    res.json({ updatedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedPost = await Post.findOneAndDelete({ _id: id, author: req.user.userId });

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPost, getPosts, editPost, deletePost };
