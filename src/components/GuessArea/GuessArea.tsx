import styles from "./GuessArea.module.css";

import { useContext, useEffect } from "react";
import ActiveGuessRow from "../ActiveGuessRow";
import GuessRow from "../GuessRow";
import { NotificationContext } from "../../contexts/NotificationContext";
import useGuesses from "../../hooks/useGuesses";

const NUMBER_OF_GUESSES = 6;
const initialState: string[][] = [];

for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
  const guess: string[] = new Array(5).fill(" ");

  initialState.push(guess);
}

export const GuessArea = () => {
  const { renderNotification } = useContext(NotificationContext);
  const { guesses, activeGuessIndex, sendGuess } = useGuesses();

  useEffect(() => {
    if (activeGuessIndex === guesses.length) {
      renderNotification("Mais sorte da próxima vez");
    }
  }, [activeGuessIndex, guesses.length, renderNotification]);

  return (
    <div className={styles.guesses}>
      {guesses.map((_, index) => {
        if (activeGuessIndex !== index) {
          return <GuessRow value={guesses[index]} key={index} />;
        }

        return <ActiveGuessRow key={index} sendGuess={sendGuess} />;
      })}
    </div>
  );
};
