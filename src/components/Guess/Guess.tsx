import { useState } from "react";
import styles from "./Guess.module.css";
import isLetter from "../../utils/isLetter";

export const Guess = () => {
  const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState(false);

  function handleKeyDown(ev: React.KeyboardEvent) {
    if (isLetter(ev.key)) setValue(ev.key);

    if (ev.key === "Backspace") setValue("");
  }

  return (
    <div
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      className={`${styles.guess} ${isActive && styles.active}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {value}
    </div>
  );
};
