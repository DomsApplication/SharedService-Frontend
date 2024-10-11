import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";

export default function Widgets() {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 150,
      }}
    >
      <CardContent>
        <Typography component="h2" variant="h5" color="primary" gutterBottom>
          <Box
            display="flex"
            justifyContent="end"
            sx={{ p:.3 }}
          >
            <Badge badgeContent={400} color="primary" />
          </Box>
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles. widespread group
          of squamate.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Paper>
  );
}
