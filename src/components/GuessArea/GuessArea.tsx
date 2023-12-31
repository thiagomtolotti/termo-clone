import styles from "./GuessArea.module.css";

import { useEffect, useState } from "react";
import ActiveGuessRow from "../ActiveGuessRow";
import GuessRow from "../GuessRow";

export const GuessArea = () => {
  const [guesses, setGuesses] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
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
          return <GuessRow value={guesses[index]} />;
        }

        return (
          <ActiveGuessRow
            active={index === activeGuessIndex}
            sendGuess={sendGuess}
            key={index}
          />
        );
      })}
    </div>
  );
};
