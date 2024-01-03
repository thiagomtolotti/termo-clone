import styles from "./GuessArea.module.css";

import { useContext, useEffect } from "react";
import ActiveGuessRow from "../ActiveGuessRow";
import GuessRow from "../GuessRow";
import { DeviceContext } from "../../contexts/NotificationContext";
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
  const { renderNotification } = useContext(DeviceContext);
  const { guesses, sendGuess, activeGuessIndex, setActiveGuessIndex } =
    useGuesses();

  // const [activeGuessIndex, setActiveGuessIndex] = useState(0);

  function handleSendGuess(ev: React.KeyboardEvent, newGuess: string[]) {
    if (ev.key !== "Enter") return;

    sendGuess(newGuess);
  }

  useEffect(() => {
    if (guesses[activeGuessIndex].indexOf("") !== -1) return;

    if (guesses[activeGuessIndex].join("").toUpperCase() === word) {
      renderNotification("Parabéns");
      setActiveGuessIndex(-1);

      return;
    }

    setActiveGuessIndex((index) => index + 1);
    renderNotification("");
  }, [guesses]);

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

        return <ActiveGuessRow sendGuess={handleSendGuess} key={index} />;
      })}
    </div>
  );
};
