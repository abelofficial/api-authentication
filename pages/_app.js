import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import {
  ThemeProvider,
  createMuiTheme,
  useMediaQuery,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import mainTheme from "../src/utils/materialTheme";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () => createMuiTheme(mainTheme(prefersDarkMode ? "dark" : "light")),
    [prefersDarkMode]
  );

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Blog</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
