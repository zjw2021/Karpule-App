import React, { useContext, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import "./searchbar.css";
import RideContext from "../../context/ride/rideContext";
import "../../styles/components.css";

const SearchBar = () => {
  const rideContext = useContext(RideContext);
  const { searchRide, rides } = rideContext;

  const onSearch = (e) => {
    searchRide(e.target.value);
  };

  return (
    <Container sx={{ width: "100%" }}>
      <Box display="flex" flexDirection="column">
        <TextField
          width="100%"
          label="Search rides"
          onChange={onSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Container>
  );
};

export default SearchBar;
