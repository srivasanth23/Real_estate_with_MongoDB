import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { useEffect, useContext } from "react";
import { createUser } from "../../utils/api";

const Layouts = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  const CreateUser = (token) => {
    if (isAuthenticated) {
      createUser(user?.email, token);
    }
  };


  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently({
        audience: "http://localhost:8000",
      });
      console.log(token);
      localStorage.setItem("access_token", token);
      setUserDetails((prev) => ({ ...prev, token: token }));
      CreateUser(token);
    };

    isAuthenticated && getToken();
  }, [isAuthenticated, getAccessTokenSilently, setUserDetails, user?.email]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layouts;
