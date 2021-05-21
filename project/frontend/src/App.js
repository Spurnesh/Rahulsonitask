import { makeStyles } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import Form from "./pages/Form";
import Home from "./pages/Home";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/form" exact>
          <Form />
        </Route>
      </Switch>
    </div>
  );
}
