import React from "react";

import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  CardMedia,
  Typography,
} from "@mui/material";

type SnapshotProps = {
  photoUrl: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  snapshot: any;
};

const ConfirmationCard: React.FC<SnapshotProps> = ({
  photoUrl,
  title,
  duration,
  price,
  description,
  snapshot,
}) => {
  return (
    <Card variant="outlined">
      <CardHeader title="Your appointment" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            // height: 400,
            position: "relative",
          }}
        />
        {snapshot && (
          <>
            <CardMedia
              component="img"
              height="194"
              image={photoUrl}
              alt={title}
            />
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ mt: 2 }}
            >
              {title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              {duration} - ${price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            {/* <Typography variant="subtitle1" sx={{ mt: 5, mb: 2 }}>
                      Gallery
                    </Typography>
                    <Gallery /> */}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ConfirmationCard;
