import React, { useState, useContext, useEffect } from "react";
import "./ContentModal.scss";
import Button from "@material-ui/core/Button";
import UserContext from "../../context/User/UserContext";

const ContentModal = ({ handleClose }) => {
  const { user, addBalance } = useContext(UserContext);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [valueOfSlots, setValueOfSlots] = useState({
    slot1: 1,
    slot2: 2,
    slot3: 3,
  });

  const getRandomArbitrary = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
  };

  const resetSlots = () => {
    setTimeout(() => {
      setValueOfSlots({
        slot1: 1,
        slot2: 2,
        slot3: 3,
      });
    }, 1000);
  };

  const hiddenMessage = () => {
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const luckyNumber = () => {
    return (
      valueOfSlots.slot1 === 7 &&
      valueOfSlots.slot2 === 7 &&
      valueOfSlots.slot3 === 7
    );
  };

  const twoSlotsEquals = () => {
    return (
      valueOfSlots.slot1 === valueOfSlots.slot2 ||
      valueOfSlots.slot1 === valueOfSlots.slot3 ||
      valueOfSlots.slot2 === valueOfSlots.slot3
    );
  };

  const threeSlotsEquals = () => {
    return (
      valueOfSlots.slot1 === valueOfSlots.slot2 &&
      valueOfSlots.slot2 === valueOfSlots.slot3
    );
  };

  const renderMessage = (amount) => {
    addBalance(amount);
    setMessage(`You Earned $${amount}`);
    setShowMessage(() => true);
    hiddenMessage();
    resetSlots();
  };

  const playGame = () => {
    setValueOfSlots({
      slot1: getRandomArbitrary(1, 10),
      slot2: getRandomArbitrary(1, 10),
      slot3: getRandomArbitrary(1, 10),
    });
    if (luckyNumber()) {
      renderMessage(10.0);
    } else if (twoSlotsEquals()) {
      renderMessage(0.5);
    } else if (threeSlotsEquals()) {
      renderMessage(5);
    }
  };

  const debug = () => {
    if (user) {
      setValueOfSlots({
        slot1: 7,
        slot2: 7,
        slot3: 7,
      });
      renderMessage(10.0);
    }
  };

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
        <div className="slot">{valueOfSlots.slot1}</div>
        <div className="slot">{valueOfSlots.slot2}</div>
        <div className="slot">{valueOfSlots.slot3}</div>
      </div>
      {showMessage && (
        <>
          <span className="message">{message}</span>
        </>
      )}
      <div className="buttons">
        <Button onClick={playGame}>Play</Button>
        <Button onClick={debug}>777 debug</Button>
        <Button onClick={handleClose}>Exit</Button>
      </div>
    </div>
  );
};

export default ContentModal;
