import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, withStyles } from "@material-ui/core/styles";
import React from "react";

const styles = createStyles({
  "@global": {
    "@import": "url('https://rsms.me/inter/inter.css')",
    "@import": "url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap')"
  }
});

const Baseline = withStyles(styles, {
  name: "Baseline"
})(() => <CssBaseline />);


export default Baseline;
