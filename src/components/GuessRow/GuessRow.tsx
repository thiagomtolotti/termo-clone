import styles from "./GuessRow.module.css";

import Guess from "../Guess";
import { useState } from "react";
import isLetter from "../../utils/isLetter";

interface GuessRowProps {
  active?: boolean;
  children?: string;
}

export const GuessRow = ({ active = false }: GuessRowProps) => {
  const [activeGuessIndex, setActiveGuessIndex] = useState(0);

  function handleGuessInput(
    ev: React.KeyboardEvent,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) {
    if (isLetter(ev.key)) {
      setValue(ev.key);

      setActiveGuessIndex((activeGuessIndex) =>
        Math.min(activeGuessIndex + 1, 4)
      );
    }

    if (ev.key === "Backspace") {
      setValue("");

      setActiveGuessIndex((activeGuessIndex) =>
        Math.max(activeGuessIndex - 1, 0)
      );
    }
  }

  return (
    active && (
      <div
        className={`${styles.guessRow} ${
          !active ? styles.inactive : styles.active
        }`}
      >
        {[...Array(5)].map((_, index) => (
          <Guess
            key={index}
            active={index === activeGuessIndex}
            handleInput={handleGuessInput}
          />
        ))}
      </div>
    )
  );
};
