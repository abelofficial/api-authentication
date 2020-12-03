import { Grid, makeStyles, Typography, useTheme } from "@material-ui/core";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

const useStyles = makeStyles((theme) => ({
  jsonContainer: {
    maxWidth: "49rem",
    overflow: "scrol",
    lineBreak: "break-all",
    "&>*": {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "32rem",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "22rem",
    },
  },
}));

const response = ({ status, statusMsg, data }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant='h6' color='secondary'>
          Response {status ? `(${status}: ${statusMsg})` : null}
        </Typography>
      </Grid>
      <Grid item xs={10} className={classes.jsonContainer}>
        <JSONInput
          id='a_unique_id'
          placeholder={data}
          locale={locale}
          viewOnly
          height='fit-content'
          confirmGood={false}
          width='100%'
          theme={
            theme.palette.type === "dark"
              ? "dark_vscode_tribute"
              : "light_mitsuketa_tribute"
          }
        />
      </Grid>
    </Grid>
  );
};

export default response;
