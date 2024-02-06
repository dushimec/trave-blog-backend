import Post from '../models/post.js';

// This is the create post end point

const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const post = new Post({ title, content, author: userId });
    await post.save();
    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);
    res.status(201).json({ message: 'Post created successfully',
    post,
    page: totalPages, });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// This is the get All posts end point
const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const posts = await Post.find()
      .skip(startIndex)
      .limit(limit)
      .populate('author', 'username');

    const totalPosts = await Post.countDocuments();

    const pagination = {
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    };

    res.json({ posts, pagination });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// This is the Updating post end point
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

// This is the deletion post end point
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

export { createPost, getPosts, editPost, deletePost };
