import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Table from "./Table.js";
import Contact from "./Contact.js";
import Graph from "./Graph.js";
import Snackbar from "@material-ui/core/Snackbar";
import AppBar from "@material-ui/core/AppBar";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#98012E" },
    secondary: { main: "#231F20" }
  }
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      addData: false,
      message: "",
      open: false
    };
  }
  componentDidMount() {
    let begin = 1200;
    setTimeout(
      function() {
        this.setState({ addData: true });
      }.bind(this),
      begin
    );

    let scraped = begin + 300;
    setTimeout(
      function() {
        this.setState({
          open: true,
          message: "New provider has been scraped."
        });
      }.bind(this),
      scraped
    );

    let closed = scraped + 1700;
    setTimeout(
      function() {
        this.setState({
          open: false
        });
      }.bind(this),
      closed
    );

    let caseworker = closed + 1200;
    setTimeout(
      function() {
        this.setState({
          open: true,
          message: "Case worker has been sent updated information on John."
        });
      }.bind(this),
      caseworker
    );

    let closecaseworker = caseworker + 1700;
    setTimeout(
      function() {
        this.setState({
          open: false
        });
      }.bind(this),
      closecaseworker
    );

    let openvet = closecaseworker + 1200;
    setTimeout(
      function() {
        this.setState({
          open: true,
          message: "John has been sent an update on the new provider."
        });
      }.bind(this),
      openvet
    );

    let closevet = openvet + 1500;
    setTimeout(
      function() {
        this.setState({
          open: false
        });
      }.bind(this),
      closevet
    );
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="static"
          style={{ alignItems: "center", marginBottom: "30px" }}
        >
          <Toolbar
            position="static"
            style={{ textAlign: "center", alignItems: "center" }}
          >
            <Typography variant="h6">VetMyNeeds</Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Grid justify="center" container spacing={3}>
            <Grid item xs={12} md={8} lg={3}>
              <Contact />
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <Graph />
            </Grid>
            <Grid item xs={12} md={8} lg={11}>
              <Typography component="div" style={{}}>
                <Table addData={this.state.addData} />
              </Typography>
            </Grid>
          </Grid>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            key={`bottom-center`}
            open={this.state.open}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{this.state.message}</span>}
          />
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
