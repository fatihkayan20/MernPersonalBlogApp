import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../redux/actions/dataActions";

function CommentForm({ id }) {
  const [comment, setComment] = useState();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      body: comment,
    };
    dispatch(commentPost(id, data));

    setComment("");
  };
  return (
    <Box my={5}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Share Comment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box width="70%" margin="auto">
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column">
                <TextField
                  placeholder="Type something..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Box
                  component={Button}
                  mt={2}
                  width="50%"
                  margin="auto"
                  variant="contained"
                  type="submit"
                >
                  Share
                </Box>
              </Box>
            </form>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default CommentForm;
