import Post from "../dbSchemas/Post.js";
import Comment from "../dbSchemas/Comment.js";
import Like from "../dbSchemas/Like.js";
import Notification from "../dbSchemas/Notification.js";
import User from "../dbSchemas/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2,
    username: req.body.username,
  };

  let errors = {};

  //   Validate
  if (userData.email.trim() === "") {
    errors.email = "Email is required";
  }
  if (userData.password.trim() === "") {
    errors.password = "Password is required";
  } else if (userData.password !== userData.password2) {
    errors.passwordConfirm = "Passwords must match";
  }

  if (userData.username.trim() === "") {
    errors.username = "Username is required";
  }

  User.findOne({ email: userData.email })
    .then((doc) => {
      if (doc) {
        errors.email = "Email is already taken";
      }
    })
    .then(() => {
      User.findOne({ username: userData.username })
        .then((doc) => {
          if (doc) {
            errors.username = "Username is already taken";
          }
        })
        .then(() => {
          if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
          }

          const newUser = new User(userData);

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(userData.password, salt, (err, hash) => {
              if (err) return res.status(400).json(err);
              newUser.password = hash;

              newUser.save().then((user) => {
                jwt.sign(
                  { id: user.id, email: user.email, username: user.username },
                  "sl_myJwtSecret",
                  (err, token) => {
                    if (err) return res.status(400).json(err);

                    return res.status(201).json({
                      user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                      },
                      token: token,
                    });
                  }
                );
              });
            });
          });
        });
    });
};

export const login = (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };
  let errors = {};
  if (userData.email.trim() === "") {
    errors.email = "Email is required";
  }
  if (userData.password.trim() === "") {
    errors.password = "Password is required";
  }

  User.findOne({ email: userData.email }).then((user) => {
    if (!user) errors.invalid = "Invalid email or password";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);
    bcrypt.compare(userData.password, user.password).then((isMatch) => {
      if (!isMatch) errors.invalid = "Invalid email or password";

      jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        "sl_myJwtSecret",
        (err, token) => {
          if (err) return res.status(400).json(err);

          return res.status(200).json({
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
            },
            token: token,
          });
        }
      );
      if (Object.keys(errors).length > 0) return res.status(400).json(errors);
    });
  });
};

export const userDetails = (req, res) => {
  const userData = {};

  User.findOne({ username: req.params.username })
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });

      userData.user = user;
      return user;
    })
    .then((user) => {
      Like.find({ user: user.username })
        .then((data) => {
          userData.likes = data;
          return user;
        })
        .then(() => {
          Post.find({ author: user.username })
            .then((data) => {
              userData.posts = data;
              return userData;
            })
            .then((data) => {
              return res.status(200).json(data);
            });
        });
    });
};
export const ownDetails = (req, res) => {
  const userData = {};

  User.findOne({ username: req.user.username })
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });

      userData.user = user;
      return user;
    })
    .then((user) => {
      Like.find({ user: user.username })
        .then((data) => {
          userData.likes = data;
          return user;
        })
        .then(() => {
          Post.find({ author: req.user.username })
            .then((data) => {
              userData.posts = data;
              return userData.user;
            })
            .then((user) => {
              Notification.find({ recipient: req.user.username })
                .then((data) => {
                  userData.notifications = data;
                  return userData;
                })
                .then((data) => {
                  return res.status(200).json(data);
                });
            });
        });
    });
};
