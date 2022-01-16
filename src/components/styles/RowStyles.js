import sizes from "./sizes";

const styles = {
  Row: {
    display: "flex",
    zIndex: "2",
    transition: '.2s ease',
    "& p": {
      [sizes.down("md")]: {
        fontSize: "0.7em",
      },
    },
  },
  controller: {
    width: "20%",
    display: "flex",
    backgroundColor: "rgba(255,255,255,0.4)",
    [sizes.down("xs")]: {
      backgroundColor: "rgba(255,255,255,0)",
      width: "40%",
    },
  },
};

export default styles;
