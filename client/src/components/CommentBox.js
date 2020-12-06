import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import moment from "moment";

function CommentBox({ comment }) {
  const [show, setShow] = useState(false);

  const handleReadMore = () => {
    setShow(!show);
  };

  return (
    <Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box component={Typography} variant="h5" marginRight="10px !important">
          {comment.user}{" "}
        </Box>
        <Box component={Typography} marginLeft="6px !important" variant="body2">
          {comment && moment(comment.createdAt).fromNow()}{" "}
        </Box>
      </Box>
      <Box>
        {show ? (
          <Typography variant="body1">
            {" "}
            {comment.body}{" "}
            {comment.body.length > 200 ? (
              <small onClick={handleReadMore}>Read Less</small>
            ) : (
              ""
            )}{" "}
          </Typography>
        ) : (
          <Typography variant="body1">
            {" "}
            {comment.body.substring(0, 200)}{" "}
            {comment.body.length > 200 ? (
              <small onClick={handleReadMore}> Read More </small>
            ) : (
              ""
            )}
          </Typography>
        )}
      </Box>
      <hr />
    </Box>
  );
}

export default CommentBox;
