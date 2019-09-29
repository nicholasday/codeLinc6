import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import contact from "./john_smith.jpg";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  }
});

export default function Contact() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="John Smith"
          height="140"
          image={contact}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            John Smith
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            John Smith lives in <i>Greensboro, NC</i>. His needs are <i>food</i>
            , and <i>shelter.</i> He served in the Vietnam war.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Contact
        </Button>
        <Button size="small" color="primary">
          More information
        </Button>
      </CardActions>
    </Card>
  );
}
