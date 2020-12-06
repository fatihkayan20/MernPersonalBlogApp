import React from "react";
import { useSelector } from "react-redux";
import { Box, Grid, IconButton } from "@material-ui/core";
import Post from "../components/Post";
import { ControlPoint } from "@material-ui/icons";
import { Link } from "react-router-dom";

function Home() {
  const posts = useSelector((state) => state.data.posts);
  return (
    <Box>
      <Box align="center" marginBottom="20px">
        <IconButton component={Link} to="/post/create">
          <ControlPoint />
        </IconButton>
      </Box>
      <Grid container spacing={1}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={4}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
