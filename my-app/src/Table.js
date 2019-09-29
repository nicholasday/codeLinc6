import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

/*
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Website</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Phone</TableCell>
              */

const rows = [
  createData(
    "Salvation Army",
    "All",
    "salvationarmycarolinas.org/greensboro/",
    "Greensboro, NC",
    "(336) 273-5572"
  ),
  createData(
    "UNCG Vet Center",
    "Education",
    "military.uncg.edu/veterans-resource-center/",
    "Greensboro, NC",
    "336-334-5632"
  ),
  createData(
    "Caring Services",
    "Shelter, substance abuse, benefits",
    "caringservices.org",
    "High Point, NC",
    "336.886.5594"
  ),
  createData(
    "Cone Health System",
    "Health, healthcare, disability",
    "conehealth.com",
    "Greensboro, NC",
    "-"
  )
];

const rows2 = [
  createData(
    "Urban Ministry",
    "Food, shelter",
    "https://greensborourbanministry.org/",
    "Greensboro, NC",
    "(336) 271-5959"
  ),
  createData(
    "Salvation Army",
    "All",
    "salvationarmycarolinas.org/greensboro/",
    "Greensboro, NC",
    "(336) 273-5572"
  ),
  createData(
    "UNCG Vet Center",
    "Education",
    "military.uncg.edu/veterans-resource-center/",
    "Greensboro, NC",
    "336-334-5632"
  ),
  createData(
    "Caring Services",
    "Shelter, substance abuse, benefits",
    "caringservices.org",
    "High Point, NC",
    "336.886.5594"
  ),
  createData(
    "Cone Health System",
    "Health, healthcare, disability",
    "conehealth.com",
    "Greensboro, NC",
    "-"
  )
];

export default function SimpleTable(props) {
  const classes = useStyles();

  var ourRows;
  if (props.addData) {
    ourRows = rows2;
  } else {
    ourRows = rows;
  }

  return (
    <Paper className={classes.root}>
      <Typography
        component="div"
        style={{
          maxHeight: 220,
          overflow: "auto"
        }}
      >
        <Table stickyHeader className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Provider Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Website</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ourRows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Typography>
    </Paper>
  );
}
