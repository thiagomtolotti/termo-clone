import styles from "./ActiveGuessRow.module.css";

import Guess from "../Guess";
import { useEffect, useState, useLayoutEffect } from "react";
import isLetter from "../../utils/isLetter";

interface ActiveGuessRowProps {
  sendGuess: (ev: KeyboardEvent, newGuess: string[]) => void;
}

export const ActiveGuessRow = ({ sendGuess }: ActiveGuessRowProps) => {
  const [guessValue, setGuessValue] = useState(Array(5).fill(""));
  const [activeGuessIndex, setActiveGuessIndex] = useState(0);

  function updateGuessValue(value: string) {
    setGuessValue((guessValue) => {
      const newGuessValue = [...guessValue];

      newGuessValue[activeGuessIndex] = value;

      return newGuessValue;
    });
  }

  function handleGuessInput(ev: KeyboardEvent) {
    if (isLetter(ev.key)) {
      updateGuessValue(ev.key);

      setActiveGuessIndex((activeIndex) => activeIndex + 1);
    }

    if (ev.key === "Backspace") {
      updateGuessValue("");

      setActiveGuessIndex((activeIndex) => activeIndex - 1);
    }
  }

  function handleGuessClick(index: number) {
    setActiveGuessIndex(index);
  }

  useEffect(() => {
    const handleArrowClick = (ev: KeyboardEvent) => {
      if (ev.key === "ArrowRight") {
        setActiveGuessIndex((activeIndex) => activeIndex + 1);
      }

      if (ev.key === "ArrowLeft") {
        setActiveGuessIndex((activeIndex) => activeIndex - 1);
      }
    };

    document.addEventListener("keydown", handleArrowClick);

    return () => {
      document.removeEventListener("keydown", handleArrowClick);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (ev) => sendGuess(ev, guessValue));

    return () => {
      document.removeEventListener("keydown", (ev) =>
        sendGuess(ev, guessValue)
      );
    };
  }, [guessValue, sendGuess]);

  useLayoutEffect(() => {
    if (activeGuessIndex > 4) {
      setActiveGuessIndex(4);
      return;
    }

    if (activeGuessIndex < 0) {
      setActiveGuessIndex(0);
      return;
    }
  }, [activeGuessIndex]);

  return (
    <div className={`${styles.guessRow}`}>
      {guessValue.map((_, index) => (
        <Guess
          key={index}
          active={index === activeGuessIndex}
          handleInput={handleGuessInput}
          value={guessValue[index]}
          index={index}
          handleClick={handleGuessClick}
        />
      ))}
    </div>
  );
};
