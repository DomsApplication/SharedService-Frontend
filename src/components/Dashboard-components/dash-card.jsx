import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
const DashCard = ({ items }) => {
  return (
    <Box sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center", width: "100%" }}>
      <Grid container   sx={
        {
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(4, 1fr)" },
          gap: { xs: 2, sm: 2, md: 3, lg: 4, xl: 5 }
        }
      }>
        {items.map((item) => (
          <Grid
            sx={
              {
                width: {
                  xs: "100%",
                  sm: "1/3",
                  md: "1/3",
                  lg: "1/4",
                  xl: "1/4"
                }
              }
            }
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
DashCard.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DashCard;
