import React, { useState, useContext, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import "./ContentModal.scss";
import Button from "@material-ui/core/Button";
import UserContext from "../../context/User/UserContext";
import { ADD_SLOTS_MACHINE_RECORD } from "../../context/types";

const ContentModal = ({ handleClose }) => {
  const { user, dispatch } = useContext(UserContext);

  const [slots, setSlots] = useState([1, 2, 3]);

  const [message, setMessage] = useState("");

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current !== null)
      switch (true) {
        case luckyNumber():
          addRecord(10);
          showMessage("Congratz, lucky number!");
          break;
        case threeEquals():
          addRecord(5);
          showMessage("Wow, three equals!");
          break;
        case twoEquals():
          addRecord(0.5);
          showMessage(`You've got a par!`);
          break;
        default:
          addRecord(-1);
          showMessage("Keep trying");
      }

    if (!timeoutRef.current) timeoutRef.current = undefined;

    return () => clearTimeout(timeoutRef.current);
  }, [slots]);

  return (
    <div className="content-modal">
      <div className="content-modal__title">
        <h1>
          Play and earn 💵{" "}
          <span className="user">
            {user ? user.name : "Your playing as a guess"}
          </span>
        </h1>
      </div>
      <div className="slots">
        <div className="slot">{slots[0]}</div>
        <div className="slot">{slots[1]}</div>
        <div className="slot">{slots[2]}</div>
      </div>
      <span className="message">{message}</span>
      <div className="buttons">
        <Button onClick={runSlotsMachine}>Play</Button>
        <Button onClick={cheat}>777 debug</Button>
        <Button onClick={handleClose}>Exit</Button>
      </div>
    </div>
  );

  function addRecord(amount) {
    if (user) {
      dispatch({
        type: ADD_SLOTS_MACHINE_RECORD,
        payload: {
          amount,
          transaction: {
            id: uuidv4(),
            slots: [...slots],
            time: new Date(),
          },
        },
      });
    }
  }

  function showMessage(message) {
    setMessage(message);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setMessage(""), 1000);
  }

  function runSlotsMachine() {
    setSlots([random(), random(), random()]);

    function random() {
      return Math.trunc(Math.random() * 10);
    }
  }

  function cheat() {
    setSlots([7, 7, 7]);
  }

  function luckyNumber() {
    return slots.every((slot) => slot === 7);
  }

  function twoEquals() {
    const [one, two, three] = slots;
    return one === two || one === three || two === three;
  }

  function threeEquals() {
    const [one, two, three] = slots;
    return one === two && one === three;
  }
};

export default ContentModal;
