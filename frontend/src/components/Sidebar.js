// src/components/Sidebar.js
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

// Importing appropriate icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CampaignIcon from "@mui/icons-material/Campaign";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";

const Sidebar = ({ setPage, activePage }) => {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, page: "dashboard" },
    { text: "Portfolio", icon: <PersonIcon />, page: "list" },
    { text: "Data Upload", icon: <CloudUploadIcon />, page: "form" },
    { text: "Notifications", icon: <NotificationsIcon />, page: "notifications" },
    { text: "Notices", icon: <CampaignIcon />, page: "notices" },
    { text: "Control Panel", icon: <SettingsIcon />, page: "control" },
    { text: "User Management", icon: <PeopleIcon />, page: "users" },
  ];

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <Box sx={{ width: 240 }}>
        {/* Sidebar Header */}
        <Typography
          variant="h6"
          sx={{ p: 2, fontWeight: "bold", textAlign: "center" }}
        >
          Loan Management
        </Typography>

        {/* Sidebar Menu */}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => setPage(item.page)}
                sx={{
                  backgroundColor:
                    activePage === item.page ? "primary.main" : "transparent",
                  color: activePage === item.page ? "#fff" : "inherit",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "#fff",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activePage === item.page ? "#fff" : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
