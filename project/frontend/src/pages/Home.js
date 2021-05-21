import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  heading: {
    marginTop: 0,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.heading}>Welcome.</h1>
      <NavLink to="/form">Go to form</NavLink>
    </div>
  );
}
