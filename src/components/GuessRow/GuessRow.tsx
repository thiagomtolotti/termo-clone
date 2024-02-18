import { GuessLetter } from "../GuessLetter/GuessLetter";
import styles from "./GuessRow.module.css";

interface GuessRowProps {
  active?: boolean;
  value: string[];
  activeIndex: number;
}

export const GuessRow = ({
  active = false,
  activeIndex,
  value,
}: GuessRowProps) => {
  return (
    <div
      className={`${styles.guessRow} ${active ? styles.active : ""}`}
      role="guess-row"
    >
      {value.map((value, index) => (
        <GuessLetter active={active && activeIndex === index}>
          {value}
        </GuessLetter>
      ))}
    </div>
  );
};
