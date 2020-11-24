import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

const response = (params) => {
  const classes = useStyles();

  return <Typography> Response </Typography>;
};

export default response;
