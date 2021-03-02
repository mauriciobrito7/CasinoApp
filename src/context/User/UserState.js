import React, { useReducer } from "react";

import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

import { SET_PROFILE, LOG_OUT, ADD_BALANCE } from "../types";

const UserState = (props) => {
  const initialUser = JSON.parse(localStorage.getItem("activeUser")) || null;

  const initialState = {
    user: initialUser,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getProfile = () => {};

  const setProfile = (user) => {
    // localStorage.setItem("users", JSON.stringify(user));
    localStorage.setItem("activeUser", JSON.stringify(user));
    dispatch({ type: SET_PROFILE, payload: user });
  };

  const addBalance = (amount) => {
    dispatch({ type: ADD_BALANCE, payload: amount });
    // localStorage.setItem("users", JSON.stringify(state.user));
    localStorage.setItem("activeUser", JSON.stringify(state.user));
  };

  const logOut = () => {
    localStorage.removeItem("activeUser");
    dispatch({ type: LOG_OUT });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        getProfile,
        setProfile,
        logOut,
        addBalance,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
