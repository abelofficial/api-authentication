import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  method: {
    backgroundColor: "red",
  },
  button: {
    height: "100%",
    width: "70%",
    marginLeft: theme.spacing(2),
  },
}));

const requestInput = ({
  method,
  setMethod,
  url,
  handleUrlChange,
  onSubmit,
}) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item sm={2} xs={3}>
        <FormControl variant="outlined" fullWidth>
          <Select
            native
            value={method}
            onChange={(event) => setMethod(event.target.value)}
            labelWidth={0}
            className={classes.methods}
            color="secondary"
            inputProps={{
              name: "method",
              id: "request-method",
            }}
          >
            <option className={classes.method} value="GET">
              GET
            </option>
            <option className={classes.method} value="PUT">
              PUT
            </option>
            <option className={classes.method} value="POST">
              POST
            </option>
            <option className={classes.method} value="PATCH">
              PATCH
            </option>
            <option className={classes.method} value="DELETE">
              DELETE
            </option>
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm={8} xs={7}>
        <TextField
          color="secondary"
          fullWidth
          id="outlined-basic"
          variant="outlined"
          value={url}
          onChange={(event) => handleUrlChange(event.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={onSubmit}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
//   };

export default requestInput;
