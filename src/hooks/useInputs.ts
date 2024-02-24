import { useEffect, useState } from "react";

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

        const newColPos = Math.min(colPos + 1, WORD_SIZE - 1);

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

        const newColPos = Math.max(colPos - 1, 0);

        return [rowPos, newColPos];
      });
    };

    const handleArrowClick = (ev: KeyboardEvent) => {
      const isArrowKey = ev.key === "ArrowLeft" || ev.key === "ArrowRight";

      if (!isArrowKey) return;

      if (ev.key === "ArrowRight") {
        setCurrentPosition((currentPosition) => {
          const [rowPos, colPos] = currentPosition;

          const newColPos = Math.min(colPos + 1, WORD_SIZE - 1);

          return [rowPos, newColPos];
        });

        return;
      }
      setCurrentPosition((currentPosition) => {
        const [rowPos, colPos] = currentPosition;

        const newColPos = Math.max(colPos - 1, 0);

        return [rowPos, newColPos];
      });
    };

    const handleEnterClick = (ev: KeyboardEvent) => {
      if (!ev.key.toLowerCase().includes("enter")) return;

      if (rowsValue[currentPosition[0]].indexOf("") !== -1) return;

      setCurrentPosition((currentPosition) => {
        const [rowPos, _] = currentPosition;

        const newRowPos = Math.min(rowPos + 1, NUMBER_OF_GUESSES);

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

  // useLayoutEffect(() => {
  //   setCurrentPosition(currentPosition);
  // }, [currentRow]);

  return { rowsValue, currentPosition };
};
