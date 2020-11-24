import { Grid, makeStyles } from "@material-ui/core";
import ApiConnector from "../src/components/apiConnector";
import Preview from "../src/components/preview";

const useStyle = makeStyles((theme) => ({
  container: {
    width: "100vw",
    minHeight: "90vh",
    padding: theme.spacing(3),
  },
  items: {
    width: "100%",
    maxWidth: "60rem",
    margin: `${theme.spacing(3)}px 0px`,
  },
}));
const index = (params) => {
  const classes = useStyle();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid className={classes.items} item>
        <ApiConnector></ApiConnector>
      </Grid>
      <Grid item className={classes.items}>
        <Preview></Preview>
      </Grid>
    </Grid>
  );
};

export default index;
