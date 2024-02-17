// Import the Post model
import Post from '../models/post.js';

// This is the create post end point

const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const limit = 10;
    const post = new Post({ title, content, author: userId, comments: [], likes: 0 });
    await post.save();
    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);
    res.status(201).json({
      message: 'Post created successfully',
      post,
      page: totalPages,
    });
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
const postComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { body } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({ body, likes: 0 });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Reply to a Comment endpoint
const replyToComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { body } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = post.comments.find(comment => comment._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.replies.push({ body, likes: 0 });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Comment endpoint
const editComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { body } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = post.comments.find(comment => comment._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.body = body;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Comment endpoint
const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    post.comments.splice(commentIndex, 1);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Like post and comment
const likeThePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { type, commentId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (type === 'post') {
      post.likes += 1;
    } else if (type === 'comment') {
      const comment = post.comments.find(comment => comment._id.toString() === commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      comment.likes += 1;
    } else {
      return res.status(400).json({ error: 'Invalid like type' });
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get Post by ID endpoint with admin privilege
const getPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id).populate('author', 'username');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Post by ID endpoint with admin privilege
const deletePostById = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedPost = await Post.findOneAndDelete({ _id: id });

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Post by ID endpoint with admin privilege
const updatePostById = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    ).populate('author', 'username');

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ updatedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createPost,
  getPosts,
  editPost,
  deletePost,
  postComment,
  likeThePost,
  getPostById,       
  deletePostById,    
  updatePostById,
  replyToComment,
  editComment,
  deleteComment,
     
};
