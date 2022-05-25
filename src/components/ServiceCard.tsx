import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#FF10F0",
    },
  },
});

type CardProps = {
  title: string;
  duration: string;
  price: number;
  description: string;
  photoUrl: string;
  serviceId: string;
};

const ServiceCard: React.FC<CardProps> = ({
  title,
  duration,
  price,
  description,
  photoUrl,
  serviceId,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <ThemeProvider theme={theme}>
        <CardMedia
          component="img"
          height="140"
          image={photoUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {duration} - ${price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`services/book/${serviceId}`}>
            <Button size="small" variant="contained" color="primary">
              Book
            </Button>
          </Link>
        </CardActions>
      </ThemeProvider>
    </Card>
  );
};

export default ServiceCard;
