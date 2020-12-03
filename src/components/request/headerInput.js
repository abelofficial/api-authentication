import { Grid, IconButton, TextField, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import RefreshIcon from "@material-ui/icons/Refresh";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    height: "100%",
    width: "70%",
    marginLeft: theme.spacing(2),
  },
  succesButton: {
    color: theme.palette.success.main,
  },
  infoButton: {
    color: theme.palette.info.main,
  },
}));

const headertInput = ({
  headersObj,
  addNewHeader,
  handleHeaderChange,
  removeHeader,
}) => {
  const classes = useStyles();

  const headers = () => (
    <Grid item xs={12}>
      {Object.keys(headersObj).map((id) => (
        <Grid container key={id} className={classes.input}>
          <Grid item xs={5}>
            <TextField
              label='Key'
              color='secondary'
              fullWidth
              variant='outlined'
              disabled={headersObj[id].disabled}
              value={headersObj[id].key}
              onChange={(e) => handleHeaderChange(id, "key", e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label='Value'
              color='secondary'
              fullWidth
              variant='outlined'
              disabled={headersObj[id].disabled}
              value={headersObj[id].value}
              onChange={(e) => handleHeaderChange(id, "value", e.target.value)}
            />
          </Grid>
          {!headersObj[id].required ? (
            <Grid item xs={2}>
              <IconButton onClick={() => removeHeader(id)}>
                <HighlightOffIcon color='error' />
              </IconButton>
            </Grid>
          ) : null}
          {headersObj[id].type === "token" ? (
            <>
              <Grid item xs={1}>
                <IconButton onClick={() => headersObj[id].onRefresh()}>
                  <RefreshIcon className={classes.succesButton} />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => removeHeader(id)}>
                  <ExitToAppIcon className={classes.infoButton} />
                </IconButton>
              </Grid>
            </>
          ) : null}
        </Grid>
      ))}
      <IconButton onClick={addNewHeader}>
        <AddCircleIcon />
      </IconButton>
    </Grid>
  );

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Typography variant='h6' color='secondary'>
          Request headers
        </Typography>
      </Grid>
      <Grid item>{headers()}</Grid>
    </Grid>
  );
};

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
//   };

export default headertInput;
