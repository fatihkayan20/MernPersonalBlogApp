import Post from "../dbSchemas/Post.js";
import Comment from "../dbSchemas/Comment.js";
import Like from "../dbSchemas/Like.js";
import Notification from "../dbSchemas/Notification.js";

export const getPosts = (req, res) => {
  const posts = [];

  Post.find()
    .then((data) => {
      data.forEach((doc) => {
        posts.push(doc);
      });
    })
    .then(() => {
      return res.json(posts);
    });
};

export const createPosts = (req, res) => {
  const postData = {
    title: req.body.title,
    author: req.user.username,
    body: req.body.body,
    tags: req.body.tags,
    images: req.body.images,
  };

  Post.findOne({ title: postData.title }).then((data) => {
    if (data) {
      return res.status(400).json({ error: "This title already exists" });
    } else {
      const newPost = new Post(postData);

      newPost
        .save()
        .then((doc) => {
          return res.status(201).json(doc);
        })
        .catch((err) => {
          return res.status(500).json(err.message);
        });
    }
  });
};

export const getPostDetails = (req, res) => {
  const postData = {};

  Post.findById(req.params.id)
    .then((doc) => {
      postData.post = doc;
      doc.visitCount += 1;
      doc.save();
    })
    .then(() => {
      postData.comments = [];
      Comment.find({ post: req.params.id })
        .then((data) => {
          data.forEach((comment) => {
            postData.comments.push(comment);
          });
        })
        .then(() => {
          postData.likes = [];
          Like.find({ post: req.params.id })
            .then((data) => {
              data.forEach((like) => {
                postData.likes.push(like);
              });
            })
            .then(() => {
              return res.json(postData);
            });
        });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ error: "Not Found" });
      } else {
        return res.status(500).json({ error: err.message });
      }
    });
};

export const createComment = (req, res) => {
  const commentData = {
    body: req.body.body,
    post: req.params.id,
    user: req.user.username,
  };

  let postData;
  Post.findById(req.params.id)
    .then((doc) => {
      postData = doc;
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ error: "Not Found" });
      } else {
        return res.status(500).json({ error: err.message });
      }
    });

  const newComment = new Comment(commentData);

  newComment
    .save()
    .then((doc) => {
      if (doc.user !== postData.author) {
        const newNot = new Notification({
          sender: req.user.username,
          recipient: postData.author,
          post: doc._id,
          type: "Comment",
        });
        newNot.save();
      }
    })
    .then(() => {
      Post.findOne({ _id: req.params.id }).then((doc) => {
        doc.commentCount += 1;
        doc.save().then((doc) => {
          return res.status(201).json(commentData);
        });
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

export const likePost = (req, res) => {
  const likeData = {
    post: req.params.id,
    user: req.user.username,
  };

  let postData;

  Post.findById(req.params.id)
    .then((doc) => {
      postData = doc;
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ error: "Not Found" });
      } else {
        return res.status(500).json({ error: err.message });
      }
    });

  const newLike = new Like(likeData);

  Like.findOne({ post: req.params.id, user: req.user.username }).then((doc) => {
    if (doc) {
      doc.delete();
      Post.findOne({ _id: req.params.id })
        .then((doc) => {
          doc.likeCount -= 1;
          postData.likeCount -= 1;
          doc.save();
        })
        .then(() => {
          Notification.findOne({
            sender: req.user.username,
            recipient: postData.author,
            type: "Like",
          }).then((data) => {
            data.delete();
          });
        })
        .then(() => {
          return res.status(200).json(postData);
        });
    } else {
      newLike
        .save()
        .then(() => {
          Post.findOne({ _id: req.params.id })
            .then((doc) => {
              doc.likeCount += 1;
              postData.likeCount += 1;
              doc.save();
            })
            .then(() => {
              const newNotification = new Notification({
                sender: req.user.username,
                recipient: postData.author,
                type: "Like",
              });

              newNotification.save();
            })
            .then(() => {
              return res.status(200).json(postData);
            });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    }
  });
};

export const deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    } else if (post.author !== req.user.username) {
      return res.status(400).json({ error: "You cannot do this" });
    } else {
      post.delete().then(async () => {
        await Like.find({ post: req.params.id }).then((data) => {
          data.forEach((like) => {
            like.delete();
          });
        });

        await Comment.find({ post: req.params.id }).then((data) => {
          data.forEach((comment) => {
            comment.delete();
          });
        });

        return res.status(200).json({ success: "Post deleted successfully" });
      });
    }
  });
};

export const deleteComment = (req, res) => {
  Comment.findOne({ id: req.params.id }).then((comment) => {
    if (!comment) {
      return res.status(404).json({ error: "Post not found" });
    } else if (comment.user !== req.user.username) {
      return res.status(400).json({ error: "You cannot do this" });
    } else {
      comment.delete().then(() => {
        return res
          .status(200)
          .json({ success: "Comment deleted successfully" });
      });
    }
  });
};
