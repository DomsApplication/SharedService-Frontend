import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
const DashCard = ({ items }) => {
  return (
    <Box sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center", width: "100%" }}>
      <Grid container spacing={{ sm: 4, lg: 5 }}>
        {items.map((item) => (
          <Grid
            xs={{
              xs: 8,
              sm: 6,
              md: 4,
              lg: 3,
              xl: 3,
            }}
            key={item.label}
          >
            <Card sx={{ maxWidth: { xs: "100%", sm: 300 } }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {item.label}
                </Typography>
                <Typography variant="h5" component="div">
                  Lorem ipsum dolor sit amet, qui minim labore .
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
DashCard.proptypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DashCard;
