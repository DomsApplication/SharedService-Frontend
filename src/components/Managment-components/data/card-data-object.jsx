// CardObjectData.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  AddOutlined,
  DeleteOutline,
  EditOutlined,
  MoreHoriz,
  VisibilityOutlined,
} from "@mui/icons-material";

const CardObjectData = ({ title, description, id }) => {
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
            badgeContent={10}
            color="primary"
            sx={{
              ml: "auto",
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
              view data
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              component={Link}
              to={`/data-management/${id}`}
              variant="text"
              color="primary"
              startIcon={<AddOutlined />}
            >
              Add Column
            </Button>
          </MenuItem>
        </Menu>
        <Box marginLeft={"auto"}>
          <IconButton color="primary">
            <EditOutlined />
          </IconButton>
          <IconButton color="error">
            <DeleteOutline />{" "}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

CardObjectData.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CardObjectData;
