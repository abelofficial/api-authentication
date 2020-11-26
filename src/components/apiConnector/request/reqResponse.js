import { Grid, makeStyles, Typography, useTheme } from "@material-ui/core";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

const useStyles = makeStyles(() => ({}));

const response = ({ status, statusMsg, data }) => {
  const theme = useTheme();
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
