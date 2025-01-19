"use client";

import { GuessRow } from "./GuessRow/GuessRow";
import { useInputs } from "../../hooks/useInputs/useInputs";
import styles from "./GuessArea.module.css";

export const GuessArea = () => {
  const { rowsValue, currentPosition, changeHorizontalPosition } = useInputs();

  return (
    <div className={"text-6xl h-full flex-shrink grid gap-1"}>
      {rowsValue.map((rowValue, index) => (
        <GuessRow
          value={rowValue}
          activeIndex={
            currentPosition[0] === index ? currentPosition[1] : undefined
          }
          key={index}
          changeHorizontalPosition={changeHorizontalPosition}
        />
      ))}
    </div>
  );
};
