import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/User/UserContext";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import "./Header.scss";

const Header = () => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState({
    name: "",
    balance: Number.parseFloat(0).toFixed(2),
  });
  const balance = Number.parseFloat(0).toFixed(2);

  const login = () => {
    userContext.setProfile(user);
  };

  const logout = () => {
    userContext.logOut();
  };

  const onChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  return (
    <header className="header">
      <div className="header-logo">Logo</div>
      <div className="header-user__info">
        <div className="balance">
          Your Balance: ${userContext.user?.balance || balance}
        </div>
        <div className="avatar">{userContext.user?.name}</div>
        {userContext.user ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <>
            <Input
              placeholder="Enter your name"
              value={user.name}
              onChange={onChange}
            />
            <Button onClick={login}>Login</Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
