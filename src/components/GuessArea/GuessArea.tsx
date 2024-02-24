"use client";

import { GuessRow } from "../GuessRow/GuessRow";
import { useInputs } from "../../hooks/useInputs";

export const GuessArea = () => {
  const { rowsValue, currentPosition } = useInputs();

  return rowsValue.map((rowValue, index) => (
    <GuessRow
      value={rowValue}
      activeIndex={
        currentPosition[0] === index ? currentPosition[1] : undefined
      }
      key={index}
    />
  ));
};
