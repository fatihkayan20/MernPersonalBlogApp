import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Favorite, Comment } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Post({ post }) {
  const likes = useSelector((state) => state.user.likes);
  const history = useHistory();
  const [isLike, setIsLike] = useState(false);
  const handleDetail = () => {
    history.push({
      pathname: `/posts/${post.title}`,
      state: { post: (post.id, post.title) },
    });
  };

  useEffect(() => {
    async function fetchIsLike() {
      if (likes) {
        const like = await likes?.filter((like) => like.post === post._id)
          .length;

        if (like > 0) {
          setIsLike(true);
        } else {
          setIsLike(false);
        }
      }
    }
    fetchIsLike();
  }, [likes, post._id]);
  return (
    <Card>
      <CardHeader
        title={post.author}
        subheader={moment(post.createdAt).fromNow()}
      />

      <CardMedia src={post.images[0]} component="img" />
      <CardContent>
        <Typography
          style={{ cursor: "pointer" }}
          onClick={handleDetail}
          variant="h5"
        >
          {" "}
          {post.title}{" "}
        </Typography>
        <Typography variant="body2">
          {" "}
          {post.body.substring(0, 150)} ...{" "}
        </Typography>
      </CardContent>

      <CardActions>
        <Box
          component={IconButton}
          color={isLike ? "red" : ""}
          variant="body1"
          size="small"
        >
          <Favorite /> {post.likeCount}
        </Box>
        <IconButton variant="h1" size="small">
          <Comment /> {post.commentCount}
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Post;
