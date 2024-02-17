"use client";

import { useEffect, useState } from "react";
import { GuessLetter } from "../GuessLetter/GuessLetter";
import styles from "./GuessRow.module.css";

const WORD_SIZE = 5;
const letterRegex = /^[a-zA-Z]$/;

interface GuessRowProps {
  active?: boolean;
}

export const GuessRow = ({ active = false }: GuessRowProps) => {
  const [activeGuessIndex, setActiveGuessIndex] = useState(0);

  useEffect(() => {
    const handleArrowClick = (ev: KeyboardEvent) => {
      if (ev.key === "ArrowRight") {
        setActiveGuessIndex((activeIndex) =>
          Math.min(activeIndex + 1, WORD_SIZE - 1)
        );
      } else if (ev.key === "ArrowLeft") {
        setActiveGuessIndex((activeIndex) =>
          activeIndex !== null ? Math.max(activeIndex - 1, 0) : 0
        );
      }
    };
    const moveActiveLetterWhenLetterInput = (ev: KeyboardEvent) => {
      if (!letterRegex.test(ev.key)) return;

      setActiveGuessIndex((activeGuessIndex) =>
        Math.min(activeGuessIndex + 1, WORD_SIZE - 1)
      );
    };

    document.addEventListener("keydown", handleArrowClick);
    document.addEventListener("keydown", moveActiveLetterWhenLetterInput);

    return () => {
      document.removeEventListener("keydown", handleArrowClick);
      document.removeEventListener("keydown", moveActiveLetterWhenLetterInput);
    };
  }, [activeGuessIndex]);

  return (
    <div
      className={`${styles.guessRow} ${active ? styles.active : ""}`}
      role="guess-row"
    >
      {[...Array(WORD_SIZE)].map((_, index) => (
        <div
          onClick={() => {
            setActiveGuessIndex(index);
          }}
          role="guess-wrapper"
          key={index}
        >
          <GuessLetter active={active && activeGuessIndex === index} />
        </div>
      ))}
    </div>
  );
};
