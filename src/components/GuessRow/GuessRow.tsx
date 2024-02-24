import { GuessLetter } from "../GuessLetter/GuessLetter";
import styles from "./GuessRow.module.css";

interface GuessRowProps {
  value: string[];
  activeIndex?: number;
}

export const GuessRow = ({ activeIndex, value }: GuessRowProps) => {
  return (
    <div
      className={`${styles.guessRow} ${
        activeIndex !== undefined ? styles.active : ""
      }`}
      role="guess-row"
    >
      {value.map((value, index) => (
        <GuessLetter active={activeIndex === index} key={index}>
          {value}
        </GuessLetter>
      ))}
    </div>
  );
};
