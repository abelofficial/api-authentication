import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const request = (params) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item> Input </Grid>
      <Grid item> Headers </Grid>
      <Grid item> Body </Grid>
    </Grid>
  );
};

export default request;
