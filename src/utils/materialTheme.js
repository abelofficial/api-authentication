const theme = (mode = "light") => {
  return {
    palette: {
      type: mode,
      primary: {
        main: mode === "light" ? "#000000" : "#BA000D",
      },
      secondary: {
        main: "#ffc400",
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
