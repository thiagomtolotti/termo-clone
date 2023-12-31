import styles from "./GuessArea.module.css";

import { useEffect, useState } from "react";
import ActiveGuessRow from "../ActiveGuessRow";
import GuessRow from "../GuessRow";

const NUMBER_OF_GUESSES = 6;
const initialState: string[][] = [];

for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
  const guess: string[] = new Array(5).fill("");

  initialState.push(guess);
}

export const GuessArea = () => {
  const [guesses, setGuesses] = useState(initialState);
  const [activeGuessIndex, setActiveGuessIndex] = useState(0);

  function sendGuess(ev: React.KeyboardEvent, newGuess: string[]) {
    if (ev.key !== "Enter" || newGuess.indexOf("") !== -1) return;

    setGuesses((guesses) => {
      const newGuesses = [...guesses];

      newGuesses[activeGuessIndex] = newGuess;

      return newGuesses;
    });

    setActiveGuessIndex((index) => index + 1);
  }

  useEffect(() => {
    console.log(guesses);
  }, [guesses]);

  return (
    <div className={styles.guesses}>
      {guesses.map((_, index) => {
        if (activeGuessIndex !== index) {
          return <GuessRow value={guesses[index]} key={index} />;
        }

        return <ActiveGuessRow sendGuess={sendGuess} key={index} />;
      })}
    </div>
  );
};
