import { Grid, makeStyles, Typography, useTheme } from "@material-ui/core";
import { useState, useEffect, useRef, useMemo } from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles(() => ({}));

const body = ({ setBody, placeholder }) => {
  const theme = useTheme();
  const jsonInput = useRef(null);

  const handleWrite = (value) => {
    setBody(value);
  };

  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant='h6' color='secondary'>
          Request body
        </Typography>
      </Grid>

      <Grid item xs={10}>
        <JSONInput
          id='input-body-json'
          ref={jsonInput}
          // placeholder={placeholder}
          locale={locale}
          height='fit-content'
          width='100%'
          reset={false}
          theme={
            theme.palette.type === "dark"
              ? "dark_vscode_tribute"
              : "light_mitsuketa_tribute"
          }
          onKeyPressUpdate={true}
          waitAfterKeyPress={100}
          onChange={(event) => {
            handleWrite(event.json);
            // console.log(jsonInput.current.getCursorPosition());
          }}
        />
      </Grid>
    </Grid>
  );
};

export default body;
