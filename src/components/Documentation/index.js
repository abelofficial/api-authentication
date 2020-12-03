import Data from "../../utils/docData.json";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, useTheme } from "@material-ui/core";
import { useState } from "react";
import { uniqueId } from "lodash";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  methods: {
    // backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "column",
  },
}));

const documentation = (params) => {
  const classes = useStyles();
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const methods = "methods";

  const doc = Object.keys(Data).map((endPoints) => (
    <Accordion key={uniqueId()}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1bh-content'
        id='panel1bh-header'
      >
        <Typography className={classes.heading}>{endPoints}</Typography>
        <Typography className={classes.secondaryHeading}>
          {Data[endPoints].url}
        </Typography>
      </AccordionSummary>

      {Object.keys(Data[endPoints]["methods"]).map((methods) => (
        <AccordionDetails key={uniqueId()} className={classes.methods}>
          <Typography variant='h6'>{methods}</Typography>
          <Typography variant='body1'>Request</Typography>
          <JSONInput
            id='a_unique_id'
            placeholder={Data[endPoints]["methods"][methods]["Request Body"]}
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
          <Typography variant='body1'>Response</Typography>
          <JSONInput
            id='a_unique_id'
            placeholder={Data[endPoints]["methods"][methods]["Response Body"]}
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
        </AccordionDetails>
      ))}
    </Accordion>
  ));

  return <> {doc} </>;
};

export default documentation;
