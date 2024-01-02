import styles from "./GuessRow.module.css";

import Guess from "../Guess";

interface GuessRowProps {
  value: string[];
  word: string;
}

export const GuessRow = ({ value, word }: GuessRowProps) => {
  function checkPosition(index: number) {
    const indexValue = value[index].toUpperCase();
    if (word[index] === indexValue) return "correct";

    if (word.indexOf(indexValue) !== -1) {
      // Checa se na posição da letra está correto
      if (word.indexOf(indexValue) !== index) return "misplaced";
    }

    return "";
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
