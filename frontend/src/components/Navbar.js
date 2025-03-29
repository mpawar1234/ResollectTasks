// src/components/Navbar.js
import React from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Open Profile Menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close Profile Menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ width: { sm: `calc(100% - 240px)` }, ml: { sm: "240px" } }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        {/* Profile Icon */}
        <Box>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
