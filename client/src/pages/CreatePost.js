import React, { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import { createPost } from "../redux/actions/dataActions";

function CreatePost() {
  const [state, setState] = useState({
    title: "",
    body: "",
    tags: [],
    images: [],
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(state));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        component={TextField}
        label="Title"
        onChange={(e) => setState({ ...state, title: e.target.value })}
      />
      <Box
        component={TextField}
        label="Body"
        multiline
        rowsMax={8}
        onChange={(e) => setState({ ...state, body: e.target.value })}
      />
      <Box
        component={TextField}
        label="Tags"
        onChange={(e) =>
          setState({ ...state, tags: [e.target.value, ...state.tags] })
        }
      />
      <Box>
        <FileBase
          type="file"
          multiple={true}
          onDone={(files) => {
            setState({ ...state, images: [] });
            files.map((file) => {
              setState({ ...state, images: [file.base64, ...state.images] });
            });
          }}
        />
      </Box>

      <Button variant="contained" color="primary" size="large" type="submit">
        {" "}
        Share
      </Button>
    </form>
  );
}

export default CreatePost;
