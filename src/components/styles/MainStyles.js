import sizes from "./sizes";

const styles = {
  Main: {
    width: "80%",
    position: "relative",
    [sizes.down("lg")]: {
      width: "90%",
    },
    [sizes.down("md")]: {
      width: "95%",
    },
    [sizes.down("sm")]: {
        width: "99%",   
      },
  },
  allRows: {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px ",
  },
  inputContainer: {
    display: "flex",
    opacity: "0",
    "& input": {
      width: "80%",
      margin: "0",
      padding: "0",
      zIndex: "10",
      cursor: "pointer",
      color: "red",
      [sizes.down("xs")]: {
        width: "99%",   
      },
    },
  },
  blockTitle: {
    width: "20%",
    [sizes.down("xs")]: {
        width: "0",   
      },
  },
  lineContainer: {
    zIndex: "0",
    position: "absolute",
    width: "80%",
    right: "0",
    height: "100%",
    [sizes.down("xs")]: {
        width: "99%",   
      },
  },
  line: {
    width: "1px",
    height: "100%",
    border: "1px solid rgba(217, 26, 29, 0.4)",
    borderTop: "0px",
    backgroundColor: "rgba(217, 26, 29, 0.4)",
    position: "absolute",
    margin: "0 6px",
    zIndex: "20",
  },
  circle: {
    borderTop: "1.5em solid rgba(217, 26, 29, 0.8)",
    borderRight: "1.5em solid transparent",
    zIndex: "30",
  },
  transition :{
    transition: "1000ms linear",
  }
};

export default styles;
