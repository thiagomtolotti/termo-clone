"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { GuessLetter } from "../GuessLetter/GuessLetter";
import styles from "./GuessRow.module.css";

const WORD_SIZE = 5;
const letterRegex = /^[a-zA-Z]$/;

interface GuessRowProps {
  active?: boolean;
}

export const GuessRow = ({ active = false }: GuessRowProps) => {
  const [activeGuessIndex, setActiveGuessIndex] = useState(0);
  const [rowValue, setRowValue] = useState(Array(WORD_SIZE).fill(""));

  useLayoutEffect(() => {
    setActiveGuessIndex(0);
  }, [active]);

  useEffect(() => {
    const handleLetterClick = (ev: KeyboardEvent) => {
      const keyPressed = ev.key;

      if (!letterRegex.test(keyPressed)) return;

      setRowValue((value) => {
        const newValue = [...value];

        newValue[activeGuessIndex] = keyPressed.toUpperCase();

        return newValue;
      });

      setActiveGuessIndex((activeGuessIndex) =>
        Math.min(activeGuessIndex + 1, WORD_SIZE - 1)
      );
    };
    const handleBackspaceClick = (ev: KeyboardEvent) => {
      const isBackspace = ev.key === "Backspace";

      if (!isBackspace) return;

      setRowValue((value) => {
        const newValue = [...value];

        newValue[activeGuessIndex] = "";

        return newValue;
      });

      setActiveGuessIndex((activeIndex) => Math.max(activeIndex - 1, 0));
    };
    const handleArrowClick = (ev: KeyboardEvent) => {
      const isArrowKey = ev.key === "ArrowLeft" || ev.key === "ArrowRight";

      if (!isArrowKey) return;

      if (ev.key === "ArrowRight") {
        setActiveGuessIndex((activeIndex) =>
          Math.min(activeIndex + 1, WORD_SIZE - 1)
        );

        return;
      }

      setActiveGuessIndex((activeIndex) => Math.max(activeIndex - 1, 0));
    };

    if (active) {
      document.addEventListener("keydown", handleLetterClick);
      document.addEventListener("keydown", handleBackspaceClick);
      document.addEventListener("keydown", handleArrowClick);
    }

    return () => {
      document.removeEventListener("keydown", handleLetterClick);
      document.removeEventListener("keydown", handleBackspaceClick);
      document.removeEventListener("keydown", handleArrowClick);
    };
  }, [active, activeGuessIndex]);

  return (
    <div
      className={`${styles.guessRow} ${active ? styles.active : ""}`}
      role="guess-row"
    >
      {rowValue.map((value, index) => (
        <div onClick={() => setActiveGuessIndex(index)} key={index}>
          <GuessLetter active={active && activeGuessIndex === index}>
            {value}
          </GuessLetter>
        </div>
      ))}
    </div>
  );
};
