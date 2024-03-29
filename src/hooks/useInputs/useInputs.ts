import { isGuessAWord } from "@/lib/actions";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNotification } from "../useNotification/useNotification";
import { ApplicationContext } from "@/context/ApplicationContext";

const NUMBER_OF_GUESSES = 6;
const WORD_SIZE = 5;
const letterRegex = /^[a-zA-Z]$/;

export const useInputs = () => {
  const [rowsValue, setRowsValue] = useState<string[][]>(
    Array.from({ length: NUMBER_OF_GUESSES }, () => Array(WORD_SIZE).fill(""))
  );
  const [currentPosition, setCurrentPosition] = useState<number[]>([0, 0]);
  const { renderNotification, clearNotification } = useNotification();
  const { correctWord } = useContext(ApplicationContext);

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

    const handleEnterClick = async (ev: KeyboardEvent) => {
      if (!ev.key.toLowerCase().includes("enter")) return;

      const currentRowValue = rowsValue[currentPosition[0]];

      if (currentRowValue.indexOf("") !== -1) return;

      const isWord = await isGuessAWord(
        currentRowValue.join().replaceAll(",", "")
      );

      if (!isWord) {
        renderNotification("Ops! Palavra inválida");

        return;
      }

      if (currentRowValue.join("").replaceAll(",", "") === correctWord) {
        renderNotification("Parabéns!");

        setCurrentPosition([-1, -1]);

        return;
      }

      const [currentTry, _] = currentPosition;
      if (currentTry === NUMBER_OF_GUESSES - 1) {
        renderNotification("Mais sorte da próxima vez!");
        setCurrentPosition([-1, -1]);

        return;
      }

      clearNotification();

      setCurrentPosition((currentPosition) => {
        const [rowPos, _] = currentPosition;

        const newRowPos = rowPos + 1;

        return [newRowPos, 0];
      });
    };

    if (currentPosition[0] !== -1) {
      document.addEventListener("keydown", handleLetterClick);
      document.addEventListener("keydown", handleBackspaceClick);
      document.addEventListener("keydown", handleArrowClick);
      document.addEventListener("keydown", handleEnterClick);
    }

    return () => {
      document.removeEventListener("keydown", handleLetterClick);
      document.removeEventListener("keydown", handleBackspaceClick);
      document.removeEventListener("keydown", handleArrowClick);
      document.removeEventListener("keydown", handleEnterClick);
    };
  }, [currentPosition, correctWord]);

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
