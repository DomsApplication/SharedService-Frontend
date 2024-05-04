import React, { useState } from "react";
import AddDataObjectDialog from "@/components/Dashboard-components/data-comp/add-data-object-dialog";
import HeadingNav from "@/components/heading-nav";
import {
  AddOutlined,
  DeleteOutline,
  EditOutlined,
  HorizontalRuleTwoTone,
  MoreHoriz,
  VisibilityOutlined,
} from "@mui/icons-material";
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
import CardObjectData from "@/components/Managment-components/data/card-data-object";

const DataObjects = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <HeadingNav
        navLinks={[
          { link: "/", label: "Dashboard" },
          { link: "/data-management", label: "Data Management" },
        ]}
      />
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Data Objects</Typography>
        <AddDataObjectDialog />
      </Box>

      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "grid",
          gridTemplateColumns: {
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr), lg:repeat(4, 1fr) , xl:repeat(4, 1fr)",
          },
          pt: 2,
          gap: 2,
        }}
      >
        {/* Card */}
        <CardObjectData title="Role" description="Role Description" id="role" />
        <CardObjectData title="demo" description="demo Description" id="demo" />
        <CardObjectData
          title="Demo E"
          description="Demo E Description"
          id="demo_e"
        />
      </Box>
    </Box>
  );
};

export default DataObjects;
