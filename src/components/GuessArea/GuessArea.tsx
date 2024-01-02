import styles from "./GuessArea.module.css";

import { useContext, useEffect, useRef, useState } from "react";
import ActiveGuessRow from "../ActiveGuessRow";
import GuessRow from "../GuessRow";
import getValidWords from "../../utils/getValidWords";
import { DeviceContext } from "../../contexts/NotificationContext";

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
  const { renderNotification } = useContext(DeviceContext);

  const [guesses, setGuesses] = useState(initialState);
  const [activeGuessIndex, setActiveGuessIndex] = useState(0);
  const validWords = useRef<string[]>();

  useEffect(() => {
    getValidWords().then((words) => {
      validWords.current = words;
    });
  }, []);

  function sendGuess(ev: React.KeyboardEvent, newGuess: string[]) {
    if (ev.key !== "Enter") return;

    if (newGuess.indexOf("") !== -1) {
      renderNotification("Só palavras com 5 letras");
      return;
    }

    if (validWords.current?.indexOf(newGuess.join("")) === -1) {
      renderNotification("Essa palavra não é aceita");
      return;
    }

    setGuesses((guesses) => {
      const newGuesses = [...guesses];

      newGuesses[activeGuessIndex] = newGuess;

      return newGuesses;
    });

    if (newGuess.join("").toUpperCase() === word) {
      renderNotification("Parabéns");
      setActiveGuessIndex(-1);

      return;
    }

    setActiveGuessIndex((index) => index + 1);

    renderNotification("");
  }

  useEffect(() => {
    if (activeGuessIndex === guesses.length) {
      renderNotification("Mais sorte da próxima vez");
    }
  }, [activeGuessIndex, guesses, renderNotification]);

  return (
    <div className={styles.guesses}>
      {guesses.map((_, index) => {
        if (activeGuessIndex !== index) {
          return <GuessRow value={guesses[index]} key={index} word={word} />;
        }

        return <ActiveGuessRow sendGuess={sendGuess} key={index} />;
      })}
    </div>
  );
};
