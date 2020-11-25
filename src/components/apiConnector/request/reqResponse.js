import { Grid, makeStyles, Typography } from "@material-ui/core";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

const useStyles = makeStyles(() => ({}));

const response = ({ status, statusMsg, data }) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h6" color="secondary">
          Response body {status ? `(${status}: ${statusMsg})` : null}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <JSONInput
          id="a_unique_id"
          placeholder={data}
          locale={locale}
          viewOnly
          height="fit-content"
          width="100%"
        />
      </Grid>
    </Grid>
  );
};

export default response;
