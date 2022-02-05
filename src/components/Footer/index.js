import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ExploreIcon from "@mui/icons-material/Explore";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const Footer = () => {
  return (
    <AppBar
      color="transparent"
      position="fixed"
      sx={{ top: "auto", bottom: 0 }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Link to="/">
          <IconButton size="large">
            <ExploreIcon fontSize="large" />
          </IconButton>
        </Link>
        <Link to="/drive">
          <IconButton size="large">
            <DirectionsCarIcon fontSize="large" />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
