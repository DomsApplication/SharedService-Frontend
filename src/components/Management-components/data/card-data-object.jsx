// CardObjectData.js
import { MoreHoriz, VisibilityOutlined } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteDataObjectDialog from "./delete-data-object-dialog";
import EditDataObjectDialog from "./edit-data-object-dialog";

const CardObjectData = ({ title, description, id, count, shortName }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{}}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "between",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography variant="h5">{title}</Typography>
          <Badge
            badgeContent={count}
            color="primary"
            sx={{
              ml: "auto",
              "& .MuiBadge-badge": {
                fontSize: "1rem",
                fontWeight: 600,
                p: 1,
              },
            }}
          ></Badge>{" "}
        </Box>
        {description}
      </CardContent>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "start",
          alignItems: "center",
          mt: "auto",
        }}
      >
        <IconButton
          variant="contained"
          color="primary"
          onClick={handleMenuClick}
        >
          <MoreHoriz />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Button
              startIcon={<VisibilityOutlined />}
              variant="text"
              color="primary"
              component={Link}
              to={`/data-management/${id}/repo`}
            >
              View Repository
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              component={Link}
              to={`/data-management/${id}`}
              variant="text"
              color="primary"
            >
              Attributes
            </Button>
          </MenuItem>
        </Menu>
        <Box marginLeft={"auto"} sx={{ display: "flex", gap: 1 }}>
          <EditDataObjectDialog id={id} />
          <DeleteDataObjectDialog id={id} />
        </Box>
      </Box>
    </Card>
  );
};

CardObjectData.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  count: PropTypes.number,
  shortName: PropTypes.string,
};

export default CardObjectData;
