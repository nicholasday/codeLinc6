import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis
} from "react-vis";
import "../node_modules/react-vis/dist/style.css";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import React from "react";
import Typography from "@material-ui/core/Typography";

class Graph extends React.Component {
  render() {
    var data = [
      { x: 1, y: 0 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 2 },
      { x: 5, y: 7 },
      { x: 6, y: 6 },
      { x: 7, y: 7 },
      { x: 8, y: 8 }
    ];
    return (
      <Grid justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="h2">
            <Box textAlign="center">John's Progress</Box>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <XYPlot height={270} width={600}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries data={data} />
          </XYPlot>
        </Grid>
      </Grid>
    );
  }
}

export default Graph;
