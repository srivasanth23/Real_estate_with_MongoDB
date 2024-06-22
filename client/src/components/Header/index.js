import React, { useState } from "react";
import "./index.css";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu";
import AddPropertyModel from "../AddPropertyModel";
import useAuthCheck from "../../hooks/useAuthCheck";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const [modelOpened, setmodelOpened] = useState(false);
  const { validateLogin } = useAuthCheck();

  const handleAddpropertyClick = () => {
    if (validateLogin()) {
      setmodelOpened(true);
    }
  };

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dlxjzmiig/image/upload/v1716013811/logo_jrzim0.png"
            alt="logo"
            className="h-image"
            width={100}
          />
        </Link>
        <input type="checkbox" id="sidebar-check" />
        <label
          htmlFor="sidebar-check"
          className="open-sidebar-button"
          onClick={() => setMenuOpened(!menuOpened)}
        >
          <IoMenu size={32} />
        </label>
        <div className="flexCenter h-menu">
          <label htmlFor="sidebar-check" className="close-sidebar-button">
            <IoClose size={32} />
          </label>
          <NavLink to="/properties"> Properties </NavLink>
          <a href="mailto:jammulasrivasanth@gmail.com">Contact</a>
          <div onClick={() => handleAddpropertyClick()}>Add Property</div>
          <AddPropertyModel opened={modelOpened} setOpened={setmodelOpened} />
          {!isAuthenticated ? (
            <button className="button" onClick={loginWithRedirect}>
              Login
            </button>
          ) : (
            <ProfileMenu user={user} logout={logout} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
