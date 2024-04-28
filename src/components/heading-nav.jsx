import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { NavigateNextSharp } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";

const HeadingNav = ({ navLinks }) => {
  const navigate = useNavigate();
  const handleClick = (link) => {
    navigate(link);
  };
  return (
    <Box role="presentation" width={"100%"} sx={{ p: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextSharp />}>
        {navLinks.map((item) => (
          <Button key={item.label} onClick={() => handleClick(item.link)}>
            <Typography variant="subtitle1"> {item.label} </Typography>
          </Button>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

HeadingNav.propTypes = {
  navLinks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HeadingNav;
