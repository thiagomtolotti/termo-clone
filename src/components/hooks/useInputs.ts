import { useEffect, useLayoutEffect, useState } from "react";

const NUMBER_OF_GUESSES = 6;
const WORD_SIZE = 5;
const letterRegex = /^[a-zA-Z]$/;

export const useInputs = () => {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [rowsValue, setRowsValue] = useState(
    Array.from({ length: NUMBER_OF_GUESSES }, () => Array(WORD_SIZE).fill(""))
  );

  useEffect(() => {
    const handleLetterClick = (ev: KeyboardEvent) => {
      const keyPressed = ev.key;

      if (!letterRegex.test(keyPressed)) return;

      setRowsValue((rowsValue) => {
        const newValue = [...rowsValue];
        const activeRowValue = newValue[currentRow];

        activeRowValue[currentGuessIndex] = keyPressed.toUpperCase();

        return newValue;
      });

      setCurrentGuessIndex((currentGuessIndex) =>
        Math.min(currentGuessIndex + 1, WORD_SIZE - 1)
      );
    };

    const handleBackspaceClick = (ev: KeyboardEvent) => {
      const isBackspace = ev.key === "Backspace";

      if (!isBackspace) return;

      setRowsValue((rowValue) => {
        const newValue = [...rowValue];
        const activeRowValue = newValue[currentRow];

        activeRowValue[currentGuessIndex] = "";

        return newValue;
      });

      setCurrentGuessIndex((activeIndex) => Math.max(activeIndex - 1, 0));
    };

    const handleArrowClick = (ev: KeyboardEvent) => {
      const isArrowKey = ev.key === "ArrowLeft" || ev.key === "ArrowRight";

      if (!isArrowKey) return;

      if (ev.key === "ArrowRight") {
        setCurrentGuessIndex((activeIndex) =>
          Math.min(activeIndex + 1, WORD_SIZE - 1)
        );

        return;
      }

      setCurrentGuessIndex((activeIndex) => Math.max(activeIndex - 1, 0));
    };

    const handleEnterClick = (ev: KeyboardEvent) => {
      if (!ev.key.toLowerCase().includes("enter")) return;

      if (rowsValue[currentRow].indexOf("") !== -1) return;

      setCurrentRow((activeRow) => Math.min(activeRow + 1, NUMBER_OF_GUESSES));
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
  }, [currentRow, currentGuessIndex]);

  useLayoutEffect(() => {
    setCurrentGuessIndex(0);
  }, [currentRow]);

  return { rowsValue, currentRow, currentGuessIndex };
};
