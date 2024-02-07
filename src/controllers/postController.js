// Import the Post model
import Post from '../models/post.js';
// Import the Comment model
import Comment from '../models/comment.js';

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


// Create Comment endpoint
const createComment = async (req, res) => {
  try {
    const { postId, content, userId } = req.body;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({ content, author: userId, post: postId });
    await comment.save();

    res.status(201).json({ message: 'Comment created successfully', comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Comments for a Post endpoint
const getCommentsForPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comments = await Comment.find({ post: postId }).populate('author', 'username');

    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPost, getPosts, editPost, deletePost,createComment,getCommentsForPost };
