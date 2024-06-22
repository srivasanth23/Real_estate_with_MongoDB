import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useMediaQuery, useTheme } from "@mui/material";

const SearchBar = ({ filter, setFilter }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="searchElement">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={isSmallScreen ? "" : "Search for location/title"}
      />
      <button className="button">Search</button>
    </div>
  );
};

export default SearchBar;
