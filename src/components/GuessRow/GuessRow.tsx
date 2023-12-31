import styles from "./GuessRow.module.css";

import Guess from "../Guess";

interface GuessRowProps {
  active?: boolean;
  children?: string;
}

export const GuessRow = ({ active = false }: GuessRowProps) => {
  return (
    <div
      className={`${styles.guessRow} ${
        !active ? styles.inactive : styles.active
      }`}
    >
      {[...Array(5)].map((_, index) => (
        <Guess key={index} />
      ))}
    </div>
  );
};
