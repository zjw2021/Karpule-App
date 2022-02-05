import React from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ExploreIcon from "@mui/icons-material/Explore";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const FooterButton = ({ currentPath, path, icon }) => (
  <Link to={path}>
    <IconButton
      color={currentPath == path ? "primary" : "default"}
      size="large"
    >
      {icon}
    </IconButton>
  </Link>
);

const Footer = () => {
  const location = useLocation();
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
        <FooterButton
          currentPath={location.pathname}
          path="/"
          icon={<ExploreIcon fontSize="large" />}
        />
        <FooterButton
          currentPath={location.pathname}
          path="/drive"
          icon={<DirectionsCarIcon fontSize="large" />}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
