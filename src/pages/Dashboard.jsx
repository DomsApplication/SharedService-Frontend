import DashCard from "@/components/Dashboard-components/dash-card";
import HeadingNav from "@/components/heading-nav";
import { Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Box>
      <HeadingNav
        navLinks={[
          {
            link: "/dash",
            label: "Dashboard",
          },
        ]}
      />

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
