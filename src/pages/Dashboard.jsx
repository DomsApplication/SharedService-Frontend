import DashCard from "@/components/Dashboard-components/dash-card";
import HeadingNav from "@/components/heading-nav";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Box width="100%">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <HeadingNav
          navLinks={[
            {
              link: "/dash",
              label: "Dashboard",
            },
          ]}
        />
        {/* nav to token  page here */}
        <Button sx={{ m: 1 }} variant="contained" component={Link} to="/login">
          Token
        </Button>
      </Box>

      <DashCard
        items={[
          {
            label: "Amounts",
          },
          {
            label: "Users",
          },
          {
            label: "Demo",
          },
          {
            label: "Some Things",
          },
        ]}
      />
    </Box>
  );
};

export default Dashboard;
