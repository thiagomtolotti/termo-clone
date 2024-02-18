"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { GuessRow } from "../GuessRow/GuessRow";

const NUMBER_OF_GUESSES = 6;
const WORD_SIZE = 5;

export const GuessArea = () => {
  const [activeRow, setActiveRow] = useState(0);
  const [activeGuessIndex, setActiveGuessIndex] = useState(0);
  const [rowsValue, setRowsValue] = useState(
    Array.from({ length: NUMBER_OF_GUESSES }, () => Array(WORD_SIZE).fill(""))
  );

  const letterRegex = /^[a-zA-Z]$/;

  useEffect(() => {
    const handleLetterClick = (ev: KeyboardEvent) => {
      const keyPressed = ev.key;

      if (!letterRegex.test(keyPressed)) return;

      setRowsValue((rowsValue) => {
        const newValue = [...rowsValue];
        const activeRowValue = newValue[activeRow];

        activeRowValue[activeGuessIndex] = keyPressed.toUpperCase();

        return newValue;
      });

      setActiveGuessIndex((activeGuessIndex) =>
        Math.min(activeGuessIndex + 1, WORD_SIZE - 1)
      );
    };

    const handleBackspaceClick = (ev: KeyboardEvent) => {
      const isBackspace = ev.key === "Backspace";

      if (!isBackspace) return;

      setRowsValue((rowValue) => {
        const newValue = [...rowsValue];
        const activeRowValue = newValue[activeRow];

        activeRowValue[activeGuessIndex] = "";

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

    const handleEnterClick = (ev: KeyboardEvent) => {
      if (!ev.key.toLowerCase().includes("enter")) return;

      if (rowsValue[activeRow].indexOf("") !== -1) return;

      setActiveRow((activeRow) => Math.min(activeRow + 1, NUMBER_OF_GUESSES));
    };

    document.addEventListener("keydown", handleLetterClick);
    document.addEventListener("keydown", handleBackspaceClick);
    document.addEventListener("keydown", handleArrowClick);
    document.addEventListener("keydown", handleEnterClick);

    return () => {
      document.removeEventListener("keydown", handleLetterClick);
      document.removeEventListener("keydown", handleBackspaceClick);
      document.removeEventListener("keydown", handleArrowClick);
      document.removeEventListener("keydown", handleEnterClick);
    };
  }, [activeGuessIndex]);

  useLayoutEffect(() => {
    setActiveGuessIndex(0);
  }, [activeRow]);

  return rowsValue.map((rowValue, index) => (
    <GuessRow
      active={activeRow === index}
      value={rowValue}
      key={index}
      activeIndex={activeGuessIndex}
    />
  ));
};
