import { Grid, makeStyles, Typography } from "@material-ui/core";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

const useStyles = makeStyles(() => ({}));

const body = ({ setBody, placeholder }) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h6" color="secondary">
          Request body
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <JSONInput
          id="a_unique_id"
          placeholder={placeholder}
          locale={locale}
          height="fit-content"
          width="100%"
          onKeyPressUpdate={true}
          waitAfterKeyPress={2000}
          onChange={(event) => setBody(event.jsObject)}
        />
      </Grid>
    </Grid>
  );
};

export default body;
