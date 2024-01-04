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

interface GuessAreaProps {
  word: string;
}

export const GuessArea = ({ word }: GuessAreaProps) => {
  const { renderNotification } = useContext(NotificationContext);
  const { guesses, sendGuess, activeGuessIndex } = useGuesses();

  function handleSendGuess(ev: React.KeyboardEvent, newGuess: string[]) {
    if (ev.key !== "Enter") return;

    sendGuess(newGuess, word);
  }

  useEffect(() => {
    if (activeGuessIndex === guesses.length) {
      renderNotification("Mais sorte da próxima vez");
    }
  }, [activeGuessIndex]);

  return (
    <div className={styles.guesses}>
      {guesses.map((_, index) => {
        if (activeGuessIndex !== index) {
          return <GuessRow value={guesses[index]} key={index} word={word} />;
        }

        return <ActiveGuessRow sendGuess={handleSendGuess} key={index} />;
      })}
    </div>
  );
};
