import styles from "./GuessRow.module.css";

import Guess from "../Guess";

interface GuessRowProps {
  value: string[];
  word: string;
}

export const GuessRow = ({ value, word }: GuessRowProps) => {
  function checkPosition(index: number) {
    const letter = value[index].toUpperCase();

    if (letter === word[index]) return "correct";

    if (word.indexOf(letter) !== -1) {
      const indexesInResult = word
        .split("")
        .reduce((acc, letterInResult, index) => {
          if (letterInResult === letter) acc.push(index);

          return acc;
        }, [] as number[]);

      for (let i = 0; i < indexesInResult.length; i++) {
        if (value[indexesInResult[i]].toUpperCase() !== letter)
          return "misplaced";
      }
    }
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
