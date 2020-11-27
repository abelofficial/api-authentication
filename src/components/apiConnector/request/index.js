import { Grid, makeStyles, Typography } from "@material-ui/core";

// Core components
import Input from "./requestInput";
import Headers from "./headerInput";
import Body from "./bodyInput";
import Response from "./reqResponse";
import { useState } from "react";
import { cloneDeep, head } from "lodash";
import { v4 as uuid } from "uuid";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "60rem",
  },
}));

const request = (params) => {
  const classes = useStyles();
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("api/");

  const [headersObj, setHeadersObj] = useState({
    [uuid()]: {
      key: "Accept",
      value: "application/json",
      required: true,
      disabled: true,
    },
  });
  const [body, setBody] = useState({ id: "abc-675-gshs", name: "hello" });
  const [reqResponse, setreqResponse] = useState({
    status: null,
    statusMsg: null,
    body: {},
  });

  const handleUrlChange = (value) => {
    if (value.startsWith("api/")) setUrl(value);
    else setUrl("api/", value);
  };

  const addNewHeader = (event, req = false, disabled = false) => {
    const key = uuid();
    setHeadersObj((prevHeaders) => ({
      ...prevHeaders,
      [key]: { key: "", value: "", required: req, disabled: disabled },
    }));
  };
  const handleHeaderChange = (id, type, value) => {
    setHeadersObj((prevHeaders) => ({
      ...prevHeaders,
      [id]: { ...prevHeaders[id], [type]: value },
    }));
  };
  const removeHeader = (id) => {
    const dupState = cloneDeep(headersObj);
    delete dupState[id];
    setHeadersObj(dupState);
  };

  // Api request submit
  const handleSubmit = async () => {
    const headers = {};
    Object.keys(headersObj).forEach((id) => {
      headers[headersObj[id].key] = headersObj[id].value;
    });

    try {
      const reqResponse = await axios({
        method: method,
        url: `/${url}`,
        headers: headers,
        data: { data: body },
      });
      setreqResponse({
        status: reqResponse.status,
        statusMsg: reqResponse.statusText,
        body: reqResponse.data,
      });
      console.log(method, "   ", url);
      if (method === "POST" && url == "api/login") {
        console.log("login found");
        setHeadersObj((prevVal) => ({
          ...prevVal,
          [uuid()]: {
            key: "Authorization",
            value: reqResponse.data.authToken,
            required: true,
            disabled: true,
          },
        }));
      }
    } catch (error) {
      setreqResponse({
        status: error.response.status,
        statusMsg: error.response.statusText,
        body: error.response.data,
      });
    }
  };

  return (
    <Grid
      container
      direction='column'
      spacing={3}
      className={classes.container}
    >
      <Grid item>
        <Input
          method={method}
          setMethod={setMethod}
          url={url}
          setUrl={setUrl}
          handleUrlChange={handleUrlChange}
          onSubmit={handleSubmit}
        />
      </Grid>
      <Grid item>
        <Headers
          headersObj={headersObj}
          setHeadersObj={setHeadersObj}
          addNewHeader={addNewHeader}
          handleHeaderChange={handleHeaderChange}
          removeHeader={removeHeader}
        />
      </Grid>
      <Grid item>
        <Body setBody={setBody} placeholder={{}} />
      </Grid>
      <Grid item>
        <Response
          status={reqResponse.status}
          statusMsg={reqResponse.statusMsg}
          data={reqResponse.body}
        />
      </Grid>
    </Grid>
  );
};

export default request;
