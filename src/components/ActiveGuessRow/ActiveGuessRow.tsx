import styles from "./ActiveGuessRow.module.css";

import Guess from "../Guess";
import { useState } from "react";
import isLetter from "../../utils/isLetter";

interface ActiveGuessRowProps {
  sendGuess: (ev: React.KeyboardEvent, newGuess: string[]) => void;
}

export const ActiveGuessRow = ({ sendGuess }: ActiveGuessRowProps) => {
  const [guessValue, setGuessValue] = useState(["", "", "", "", ""]);
  const [activeGuessIndex, setActiveGuessIndex] = useState(0);

  function updateGuessValue(value: string) {
    setGuessValue((guessValue) => {
      const newGuessValue = [...guessValue];

      newGuessValue[activeGuessIndex] = value;

      return newGuessValue;
    });
  }

  function handleGuessInput(ev: React.KeyboardEvent) {
    if (isLetter(ev.key)) {
      updateGuessValue(ev.key);

      setActiveGuessIndex((activeGuessIndex) =>
        Math.min(activeGuessIndex + 1, 4)
      );
    }

    if (ev.key === "Backspace") {
      updateGuessValue("");

      setActiveGuessIndex((activeGuessIndex) =>
        Math.max(activeGuessIndex - 1, 0)
      );
    }
  }

  return (
    <div
      className={`${styles.guessRow}`}
      onKeyDown={(ev) => sendGuess(ev, guessValue)}
    >
      {guessValue.map((_, index) => (
        <Guess
          key={index}
          active={index === activeGuessIndex}
          handleInput={handleGuessInput}
          value={guessValue[index]}
        />
      ))}
    </div>
  );
};
