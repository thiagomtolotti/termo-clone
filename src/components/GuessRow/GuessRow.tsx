import styles from "./GuessRow.module.css";

import Guess from "../Guess";

interface GuessRowProps {
  value: string[];
}

export const GuessRow = ({ value }: GuessRowProps) => {
  return (
    <div className={styles.row}>
      {value.map((value, index) => (
        <Guess handleInput={() => {}} value={value} blocked key={index} />
      ))}
    </div>
  );
};
