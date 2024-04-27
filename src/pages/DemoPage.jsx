import MainCard from "@/components/main-card";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const DemoPage = () => {
  const location = useLocation();
  return (
    <Box minHeight={"200vh"}>
      <MainCard>
        <Typography variant="h3">DemoPage {location.pathname} </Typography>
        <Typography>
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, tempore soluta dolores ipsum ab veritatis ut adipisci harum excepturi
          nihil provident, animi pariatur quo ipsam libero iusto sed neque autem.{" "}
        </Typography>
      </MainCard>
    </Box>
  );
};

export default DemoPage;
