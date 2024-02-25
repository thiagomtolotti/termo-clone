"use client";

import { GuessRow } from "../GuessRow/GuessRow";
import { useInputs } from "../../hooks/useInputs";
import styles from "./GuessArea.module.css";

export const GuessArea = () => {
  const { rowsValue, currentPosition } = useInputs();

  return (
    <div className={styles.guessArea}>
      {rowsValue.map((rowValue, index) => (
        <GuessRow
          value={rowValue}
          activeIndex={
            currentPosition[0] === index ? currentPosition[1] : undefined
          }
          key={index}
        />
      ))}
    </div>
  );
};
