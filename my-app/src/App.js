import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Table from "./Table.js";

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink
  }
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      addData: true
    };
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Typography component="div" style={{}}>
            <Button color="primary">Primary</Button>
            <Button
              onClick={e => {
                this.setState({ addData: !this.state.addData });
              }}
              color="secondary"
            >
              Secondary
            </Button>
            <Table addData={this.state.addData} />
          </Typography>
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
