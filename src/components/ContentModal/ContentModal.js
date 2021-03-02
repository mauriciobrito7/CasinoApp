import React, { useState, useContext } from "react";
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

  const playGame = () => {
    if (user) {
      if (
        valueOfSlots.slot1 === 7 &&
        valueOfSlots.slot2 === 7 &&
        valueOfSlots.slot3 === 7
      ) {
        addBalance(10);
        setMessage("You Earned $10.00");
        setShowMessage(() => true);
        hiddenMessage();
        resetSlots();
      } else if (
        valueOfSlots.slot1 === valueOfSlots.slot2 ||
        valueOfSlots.slot1 === valueOfSlots.slot3 ||
        valueOfSlots.slot2 === valueOfSlots.slot3
      ) {
        addBalance(0.5);
        setMessage("You Earned $0.5");
        setShowMessage(() => true);
        hiddenMessage();
        resetSlots();
      } else if (
        valueOfSlots.slot1 === valueOfSlots.slot2 &&
        valueOfSlots.slot1 === valueOfSlots.slot3
      ) {
        addBalance(5);
        setMessage("You Earned $5");
        setShowMessage(() => true);
        hiddenMessage();
        resetSlots();
      }
    }
    setValueOfSlots(() => {
      return {
        slot1: getRandomArbitrary(1, 10),
        slot2: getRandomArbitrary(1, 10),
        slot3: getRandomArbitrary(1, 10),
      };
    });
  };

  const debug = () => {
    setValueOfSlots({
      slot1: 7,
      slot2: 7,
      slot3: 7,
    });
    addBalance(10);
    setMessage("You Earned $10.00");
    setShowMessage(() => true);
    hiddenMessage();
    resetSlots();
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
