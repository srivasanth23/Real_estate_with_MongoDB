import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, Avatar } from "@mui/material";

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Avatar
        src={user?.picture}
        alt="Profile Picture"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => navigate("./favorites", { replace: true })}>
          Favorites
        </MenuItem>
        <MenuItem onClick={() => navigate("./bookings", { replace: true })}>
          Bookings
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
