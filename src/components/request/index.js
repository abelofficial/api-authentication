import { Grid, makeStyles, Typography } from "@material-ui/core";

// Core components
import Input from "./requestInput";
import Headers from "./headerInput";
import Body from "./bodyInput";
import Response from "./reqResponse";
import { useEffect, useState } from "react";
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
  const authHeaderId = "AuthTokenHeader";

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

  const [body, setBody] = useState({});
  const [reqResponse, setreqResponse] = useState({
    status: null,
    statusMsg: null,
    body: {},
  });

  const handleUrlChange = (value) => {
    if (value.startsWith("api/")) setUrl(value);
    else setUrl("api/", value);
  };

  const addNewHeader = (event, required = false, disabled = false) => {
    const key = uuid();
    setHeadersObj((prevHeaders) => ({
      ...prevHeaders,
      [key]: { key: "", value: "", required: required, disabled: disabled },
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

    const jsonReq =
      Object.keys(body).length !== 0 ? await JSON.parse(body) : {};
    try {
      const reqResponse = await axios({
        method: method,
        url: `/${url}`,
        headers: headers,
        data: jsonReq,
      });
      setreqResponse({
        status: reqResponse.status,
        statusMsg: reqResponse.statusText,
        body: reqResponse.data,
      });

      if (method === "POST" && url == "api/login") {
        createAuthorizationHeader(reqResponse.data.authToken);
        localStorage.setItem("refreshToken", reqResponse.data.refreshToken);
      }
    } catch (error) {
      if (
        error.response.statusText === "Expired token" &&
        localStorage.getItem("refreshToken") !== null
      ) {
        const newToken = await refreshAccessToken(
          localStorage.getItem("refreshToken")
        );
        setAccessToken(newToken);

        // handleSubmit();
      }
      setreqResponse({
        status: error.response.status,
        statusMsg: error.response.statusText,
        body: error.response.data,
      });
    }
  };

  const createAuthorizationHeader = (token) => {
    setHeadersObj((prevVal) => ({
      ...prevVal,
      [authHeaderId]: {
        key: "Authorization",
        value: token,
        required: true,
        disabled: false,
        type: "token",
        onRefresh: async () => {
          const newToken = await refreshAccessToken(
            localStorage.getItem("refreshToken")
          );
        },
        onLogout: () => {
          localStorage.removeItem("refreshToken");
          removeHeader(authHeaderId);
        },
      },
    }));
  };

  const accessToken = async () => {
    const savedRefreshToken = localStorage.getItem("refreshToken");

    if (savedRefreshToken) {
      const newToken = await refreshAccessToken(savedRefreshToken);
      return newToken;
    }
    return;
  };

  const refreshAccessToken = async (refreshToken) => {
    const refreshResp = await axios({
      method: "get",
      url: `/api/token`,
      params: { token: refreshToken },
    });

    return refreshResp.data.authToken;
  };

  useEffect(async () => {
    const token = await accessToken();
    token ? createAuthorizationHeader(token) : null;
  }, []);

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
        <Body setBody={setBody} placeholder={body} />
      </Grid>
      {reqResponse.status != null ? (
        <Grid item>
          <Response
            status={reqResponse.status}
            statusMsg={reqResponse.statusMsg}
            data={reqResponse.body}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default request;
