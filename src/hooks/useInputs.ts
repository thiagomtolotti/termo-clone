import { useEffect, useLayoutEffect, useState } from "react";

const NUMBER_OF_GUESSES = 6;
const WORD_SIZE = 5;
const letterRegex = /^[a-zA-Z]$/;

export const useInputs = () => {
  const [rowsValue, setRowsValue] = useState(
    Array.from({ length: NUMBER_OF_GUESSES }, () => Array(WORD_SIZE).fill(""))
  );
  const [currentPosition, setCurrentPosition] = useState<number[]>([0, 0]);

  useEffect(() => {
    const handleLetterClick = (ev: KeyboardEvent) => {
      const keyPressed = ev.key;

      if (!letterRegex.test(keyPressed)) return;

      setRowsValue((rowsValue) => {
        const newValue = [...rowsValue];
        const activeRowValue = newValue[currentPosition[0]];

        activeRowValue[currentPosition[1]] = keyPressed.toUpperCase();

        return newValue;
      });

      setCurrentPosition((currentPosition) => {
        const [rowPos, colPos] = currentPosition;

        const newColPos = colPos + 1;

        return [rowPos, newColPos];
      });
    };

    const handleBackspaceClick = (ev: KeyboardEvent) => {
      const isBackspace = ev.key === "Backspace";

      if (!isBackspace) return;

      setRowsValue((rowValue) => {
        const newValue = [...rowValue];
        const activeRowValue = newValue[currentPosition[0]];

        activeRowValue[currentPosition[1]] = "";

        return newValue;
      });

      setCurrentPosition((currentPosition) => {
        const [rowPos, colPos] = currentPosition;

        const newColPos = colPos - 1;

        return [rowPos, newColPos];
      });
    };

    const handleArrowClick = (ev: KeyboardEvent) => {
      const isArrowKey = ev.key === "ArrowLeft" || ev.key === "ArrowRight";

      if (!isArrowKey) return;

      if (ev.key === "ArrowRight") {
        setCurrentPosition((currentPosition) => {
          const [rowPos, colPos] = currentPosition;

          const newColPos = colPos + 1;

          return [rowPos, newColPos];
        });

        return;
      }

      setCurrentPosition((currentPosition) => {
        const [rowPos, colPos] = currentPosition;

        const newColPos = colPos - 1;

        return [rowPos, newColPos];
      });
    };

    const handleEnterClick = (ev: KeyboardEvent) => {
      if (!ev.key.toLowerCase().includes("enter")) return;

      if (rowsValue[currentPosition[0]].indexOf("") !== -1) return;

      setCurrentPosition((currentPosition) => {
        const [rowPos, _] = currentPosition;

        const newRowPos = rowPos + 1;

        return [newRowPos, 0];
      });
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
  }, [currentPosition]);

  useLayoutEffect(() => {
    const activeGuess = currentPosition[1];
    const activeRow = currentPosition[0];

    if (activeGuess > WORD_SIZE - 1) {
      setCurrentPosition((currentPosition) => {
        const [rowPos, _] = currentPosition;

        const newColPos = WORD_SIZE - 1;

        return [rowPos, newColPos];
      });
    }

    if (activeGuess < 0) {
      setCurrentPosition((currentPosition) => {
        const [rowPos, _] = currentPosition;

        return [rowPos, 0];
      });
    }

    if (activeRow > NUMBER_OF_GUESSES - 1) {
      setCurrentPosition([-1, 0]);
    }
  }, [currentPosition]);

  // useLayoutEffect(() => {
  //   setCurrentPosition(currentPosition);
  // }, [currentRow]);

  return { rowsValue, currentPosition };
};
