import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useStyles from "./styles";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { getPosts } from "./redux/actions/dataActions";
import { useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Router>
      <div className={classes.main}>
        <Navbar />
        <div className={classes.container}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts/:id" component={PostDetail} />
            <Route exact path="/post/create" component={CreatePost} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
