import { useCallback, useContext, useEffect } from "react";
import { GuessLetter } from "../GuessLetter/GuessLetter";
import styles from "./GuessRow.module.css";
import { ApplicationContext } from "@/context/ApplicationContext";

interface GuessRowProps {
  value: string[];
  activeIndex?: number;
}

export const GuessRow = ({ activeIndex, value }: GuessRowProps) => {
  const { correctWord } = useContext(ApplicationContext);

  const setIsCorrectOrMisplaced = useCallback(
    (index: number) => {
      if (activeIndex !== undefined || value.indexOf("") !== -1 || !correctWord)
        return;
      const currentLetter = value[index].toUpperCase();

      if (currentLetter === correctWord[index]) return "correct";

      if (correctWord.indexOf(currentLetter) !== -1) {
        const indexesInResult = correctWord
          .split("")
          .reduce((acc, letterInResult, index) => {
            if (letterInResult === currentLetter) acc.push(index);

            return acc;
          }, [] as number[]);

        for (let i = 0; i < indexesInResult.length; i++) {
          if (value[indexesInResult[i]].toUpperCase() === currentLetter) return;

          return "misplaced";
        }
      }
    },
    [correctWord, activeIndex, value]
  );

  return (
    <div
      className={`${styles.guessRow} ${
        activeIndex !== undefined ? styles.active : ""
      }`}
      role="guess-row"
    >
      {value.map((value, index) => (
        <GuessLetter
          active={activeIndex === index}
          isCorrectOrMisplaced={setIsCorrectOrMisplaced(index)}
          key={index}
        >
          {value}
        </GuessLetter>
      ))}
    </div>
  );
};
