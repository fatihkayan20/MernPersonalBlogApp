import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.UI.errors);
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
    showPassword: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: state.email,
      username: state.username,
      password: state.password,
      password2: state.password2,
    };

    dispatch(signupUser(userData, history));
  };
  const handleShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <Box width="50%" margin="auto" boxShadow="1px 1px 1px 2px  #cdcbcb">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" padding="15px">
          <Box component="h2" margin="auto">
            Signup
          </Box>
          <Box component={FormControl} marginBottom="20px !important">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              value={state.email}
              onChange={handleChange}
            />
            {errors.email && (
              <Box component={Typography} variant="caption" color="#e43a3a">
                {" "}
                {errors.email}
              </Box>
            )}
          </Box>
          <Box component={FormControl} marginBottom="20px !important">
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              name="username"
              value={state.username}
              onChange={handleChange}
            />
            {errors.username && (
              <Box component={Typography} variant="caption" color="#e43a3a">
                {" "}
                {errors.username}
              </Box>
            )}
          </Box>
          <Box marginBottom="20px !important" component={FormControl}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              type={state.showPassword ? "" : "password"}
              value={state.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="start" onClick={handleShowPassword}>
                  <IconButton>
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password && (
              <Box component={Typography} variant="caption" color="#e43a3a">
                {" "}
                {errors.password}
              </Box>
            )}
          </Box>
          <Box marginBottom="20px !important" component={FormControl}>
            <InputLabel htmlFor="password2">Confirm Password</InputLabel>
            <Input
              id="password2"
              name="password2"
              type={state.showPassword ? "" : "password"}
              value={state.password2}
              onChange={handleChange}
            />
            {errors.passwordConfirm && (
              <Box component={Typography} variant="caption" color="#e43a3a">
                {" "}
                {errors.passwordConfirm}
              </Box>
            )}
          </Box>
          <Box
            component={Button}
            type="submit"
            variant="contained"
            width="50%"
            margin="auto"
          >
            Signup
          </Box>
        </Box>
      </form>

      <Box display="flex" justifyContent="center">
        <Box component={Typography} variant="body2">
          You have an account?{" "}
        </Box>
        <Box component={Link} color="#1d37fc !important" to="/login" mx={1}>
          Login
        </Box>
      </Box>
    </Box>
  );
}

export default Signup;
