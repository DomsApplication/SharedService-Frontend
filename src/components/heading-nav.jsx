import { NavigateNextSharp } from "@mui/icons-material";
import { Box } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const HeadingNav = ({ navLinks }) => {
  const navigate = useNavigate();
  const handleClick = (link) => {
    navigate(link);
  };
  return (
    <Box role="presentation" width={"100%"} sx={{ p: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextSharp />}>
        {navLinks.map((item, index) => (
          <Button
            variant="link"
            key={index}
            onClick={() => handleClick(item.link)}
          >
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
