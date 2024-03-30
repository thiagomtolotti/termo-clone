import { ApplicationContext } from "@/context/ApplicationContext";
import { useContext, useEffect, useState } from "react";

export const useGuessesInStorage = () => {
  const [initialPosition, setInitialPosition] = useState(0);
  const { correctWord } = useContext(ApplicationContext);

  const getGuessesInStorage = () => {
    const guessesInStorage = localStorage.getItem("guesses");

    if (!guessesInStorage) return null;

    return JSON.parse(guessesInStorage) as string[][];
  };

  useEffect(() => {
    const getInitialPosition = () => {
      const guessesInStorage = getGuessesInStorage();

      if (!guessesInStorage) return 0;

      const isOneGuessCorrect = guessesInStorage.find(
        (guess) => guess.join("").replaceAll(",", "") === correctWord
      );
      if (isOneGuessCorrect) return -1;

      let indexOfCurrentGuess = 0;
      guessesInStorage.map((guess) => {
        if (guess.indexOf("") !== -1) return;

        indexOfCurrentGuess++;
      });

      return indexOfCurrentGuess;
    };

    setInitialPosition(getInitialPosition());
  }, [correctWord]);

  return {
    guessesInStorage: getGuessesInStorage(),
    positionInStorage: initialPosition,
  };
};
