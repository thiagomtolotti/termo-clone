import styles from "./GuessRow.module.css";

import Guess from "../Guess";
import { useContext } from "react";
import { UsedKeysContext } from "../../contexts/UsedKeysContext";

interface GuessRowProps {
  value: string[];
  word: string;
}

export const GuessRow = ({ value, word }: GuessRowProps) => {
  const { setMisplacedLetters, setWrongLetters, setCorrectLetters } =
    useContext(UsedKeysContext);

  function checkPosition(index: number) {
    const letter = value[index].toUpperCase();

    if (letter === word[index]) {
      setCorrectLetters((current) => {
        const newLetters = [...current];

        if (current.indexOf(letter) !== -1) return current;
        newLetters.push(letter);

        return newLetters;
      });
      return "correct";
    }

    if (word.indexOf(letter) !== -1) {
      const indexesInResult = word
        .split("")
        .reduce((acc, letterInResult, index) => {
          if (letterInResult === letter) acc.push(index);

          return acc;
        }, [] as number[]);

      for (let i = 0; i < indexesInResult.length; i++) {
        if (value[indexesInResult[i]].toUpperCase() !== letter) {
          setMisplacedLetters((current) => {
            const newLetters = [...current];

            if (current.indexOf(letter) !== -1) return current;
            newLetters.push(letter);

            return newLetters;
          });

          return "misplaced";
        }
      }
    }

    setWrongLetters((current) => {
      const newLetters = [...current];

      if (current.indexOf(letter) !== -1) return current;
      newLetters.push(letter);

      return newLetters;
    });
  }

  return (
    <div className={styles.row}>
      {value.map((value, index) => (
        <Guess
          key={index}
          handleInput={() => {}}
          value={value}
          blocked
          position={checkPosition(index)}
          handleClick={() => {}}
          index={0}
        />
      ))}
    </div>
  );
};
