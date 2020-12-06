import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Typography } from "@material-ui/core";
import { getPostDetail, likePost } from "../redux/actions/dataActions";
import { useParams } from "react-router-dom";
import { AccountCircle, ThumbUpAlt } from "@material-ui/icons";
import moment from "moment";
import CommentBox from "../components/CommentBox";
import CommentForm from "../components/CommentForm";

function PostDetail() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.data.posts);
  const post = useSelector((state) => state.data.post.post);
  const data = useSelector((state) => state.data.post);
  const likes = useSelector((state) => state.user.likes);
  const params = useParams();
  const [isLike, setIsLike] = useState();

  useEffect(() => {
    async function fetchData() {
      const title = await params.id;

      const selectedPost = await posts.filter((post) => post.title === title);
      if (selectedPost.length > 0) {
        dispatch(getPostDetail(selectedPost[0]?._id));
      }
    }
    fetchData();
  }, [dispatch, params.id, posts]);

  useEffect(() => {
    async function fetchIsLike() {
      const like = await likes.filter((like) => like.post === post?._id).length;
      if (like > 0) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    }
    fetchIsLike();
  }, [likes, post?._id]);
  const handleLike = () => {
    dispatch(likePost(post._id));
    setIsLike(!isLike);
  };
  return (
    <Box margin={"0 0 50px 0"}>
      <Box>
        <Typography align="center" variant="h5">
          {post?.title}
        </Typography>
        <Box align="right" variant="body2">
          <IconButton size="small">
            <AccountCircle />
            {post?.author}
          </IconButton>
          {post && moment(post?.createdAt).fromNow()}
        </Box>
      </Box>
      <Box>
        <Typography variant="body1">{post?.body}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" marginTop="10px">
        <Box
          component={IconButton}
          display="flex"
          alignItems="center"
          onClick={handleLike}
          color={isLike ? "green" : ""}
        >
          <ThumbUpAlt />

          {post?.likeCount}
        </Box>
      </Box>
      <Box margin="50px 0 10px 0" component="h1" align="center">
        {" "}
        Comments ({post?.commentCount})
      </Box>
      <Box>
        <CommentForm id={post?._id} />
      </Box>
      <Box>
        {data.comments?.map((comment) => (
          <CommentBox key={comment._id} comment={comment} />
        ))}
      </Box>
    </Box>
  );
}

export default PostDetail;
