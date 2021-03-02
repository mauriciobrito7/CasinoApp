import React, { useReducer, useEffect } from "react";

import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

import { SET_PROFILE, LOG_OUT } from "../types";

const UserState = (props) => {
  const [state, dispatch] = useReducer(UserReducer, { user: undefined });

  //load current user
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) dispatch({ type: SET_PROFILE, payload: currentUser });
  }, []);

  //update local storage
  useEffect(() => {
    if (state.user)
      localStorage.setItem("currentUser", JSON.stringify(state.user));
  }, [state.user]);

  function logIn(userName) {
    const usersDB = JSON.parse(localStorage.getItem("usersDB")) || [];
    const index = usersDB.findIndex((user) => user.name === userName);

    var user = { name: userName, balance: 0, slotsMachineRecords: [] };

    if (index !== -1) {
      user = usersDB.splice(index, 1).pop();

      user.slotsMachineRecords.forEach((record) => {
        record.time = new Date(record.time);
      });

      localStorage.setItem("usersDB", JSON.stringify(usersDB));
    }

    dispatch({ type: SET_PROFILE, payload: user });
  }

  function logOut() {
    const usersDB = JSON.parse(localStorage.getItem("usersDB")) || [];
    usersDB.push(state.user);
    localStorage.setItem("usersDB", JSON.stringify(usersDB));
    localStorage.removeItem("currentUser");
    dispatch({ type: LOG_OUT });
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        logIn,
        logOut,
        dispatch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
