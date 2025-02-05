import { useCallback, useContext } from "react";
import { GuessLetter } from "./GuessLetter/GuessLetter";
import { ApplicationContext } from "@/context/ApplicationContext";

interface GuessRowProps {
  value: string[];
  activeIndex?: number;
  changeHorizontalPosition: (newPosition: number) => void;
}

export const GuessRow = ({
  activeIndex,
  value,
  changeHorizontalPosition,
}: GuessRowProps) => {
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
    <div className="grid grid-cols-5 gap-1" role="guess-row">
      {value.map((value, index) => (
        <GuessLetter
          isRowActive={activeIndex !== undefined}
          active={activeIndex === index}
          isCorrectOrMisplaced={setIsCorrectOrMisplaced(index)}
          onClick={() => {
            if (activeIndex === undefined) return;

            changeHorizontalPosition(index);
          }}
          key={index}
        >
          {value}
        </GuessLetter>
      ))}
    </div>
  );
};
