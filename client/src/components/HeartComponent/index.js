import React, { useState, useContext, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import { addToFav } from "../../utils/api";
import UserDetailContext from "../../context/UserDetailContext";
import { checkFavourites, updateFavourites } from "../../utils/common";

const HeartComponent = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const {
    setUserDetails,
    userDetails: { favourites },
  } = useContext(UserDetailContext);

  useEffect(() => {
    setHeartColor(() => checkFavourites(id, favourites));
  }, [favourites, id]);

  const toFav = () => {
    addToFav(id, user?.email);
  };

  const handleLike = () => {
    if (validateLogin) {
      toFav();
      setUserDetails((prev) => ({
        ...prev,
        favourites: updateFavourites(id, prev.favourites),
      }));
      setHeartColor((prev) => (prev === "red" ? "white" : "red"));
    }
  };

  return (
    <div>
      <AiFillHeart
        size={30}
        color={heartColor}
        onClick={(e) => {
          e.stopPropagation();
          handleLike();
        }}
      />
    </div>
  );
};

export default HeartComponent;
