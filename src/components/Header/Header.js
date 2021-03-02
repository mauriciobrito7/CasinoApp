import React, { useState, useContext } from "react";
import UserContext from "../../context/User/UserContext";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import "./Header.scss";
import Logo from "../Icons/Logo";

const Header = () => {
  const userContext = useContext(UserContext);
  const [userName, setUserName] = useState("");

  const login = () => {
    if (userName) userContext.logIn(userName);
  };

  const logout = () => {
    userContext.logOut();
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Logo />
      </div>
      <div className="header-user__info">
        <div className="balance">
          Your Balance: ${userContext.user?.balance || 0}
        </div>
        <div className="avatar">{userContext.user?.name}</div>
        {userContext.user ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <>
            <Input
              placeholder="Enter your name"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <Button onClick={login}>Login</Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
