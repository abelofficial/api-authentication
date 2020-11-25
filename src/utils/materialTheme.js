const theme = (mode = "light") => {
  return {
    palette: {
      type: mode,
      primary: {
        main: "#BA000D",
      },
      secondary: {
        main: mode === "light" ? "#000000" : "#ffc400",
      },
    },
    typography: {
      h1: {
        fontFamily: "Open Sans",
      },
      link: {
        fontFamily: "Open Sans",
        fontSize: "1.5rem",
        textDecoration: "none",
      },
      button: {
        textTransform: "capitalize",
      },
    },
  };
};

export default theme;
