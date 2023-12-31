import styles from "./GuessRow.module.css";

import Guess from "../Guess";
import { useState } from "react";
import isLetter from "../../utils/isLetter";

interface GuessRowProps {
  active?: boolean;
  children?: string;
}

export const GuessRow = ({ active = false }: GuessRowProps) => {
  const [guessValue, setGuessValue] = useState(["", "", "", "", ""]);
  const [activeGuessIndex, setActiveGuessIndex] = useState(0);

  function handleGuessInput(ev: React.KeyboardEvent) {
    if (isLetter(ev.key)) {
      setGuessValue((guessValue) => {
        const newGuessValue = [...guessValue];

        newGuessValue[activeGuessIndex] = ev.key;

        return newGuessValue;
      });

      setActiveGuessIndex((activeGuessIndex) =>
        Math.min(activeGuessIndex + 1, 4)
      );
    }

    if (ev.key === "Backspace") {
      setGuessValue((guessValue) => {
        const newGuessValue = [...guessValue];

        newGuessValue[activeGuessIndex] = "";

        return newGuessValue;
      });

      setActiveGuessIndex((activeGuessIndex) =>
        Math.max(activeGuessIndex - 1, 0)
      );
    }
  }

  function sendGuess(ev: React.KeyboardEvent) {
    if (ev.key !== "Enter") return;

    console.log(`Guess ${guessValue}`);
  }

  return (
    active && (
      <div
        className={`${styles.guessRow} ${
          !active ? styles.inactive : styles.active
        }`}
        onKeyDown={sendGuess}
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
    )
  );
};
