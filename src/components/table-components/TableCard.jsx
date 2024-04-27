import PropTypes from "prop-types";

import MainCard from "@/components/main-card";
import { Box } from "@mui/material";

const TableCard = ({ children, ...other }) => (
  <MainCard
    sx={{
      maxWidth: { xs: 300, sm: 410, md: 710, lg: 810, xl: 1200 },
      margin: { xs: 2.5, md: 3 },
      "& > *": {
        flexGrow: 1,
        flexBasis: "50%",
      },
    }}
    content={false}
    {...other}
    border={false}
    boxShadow
  >
    <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
  </MainCard>
);

TableCard.propTypes = {
  children: PropTypes.node,
};

export default TableCard;
