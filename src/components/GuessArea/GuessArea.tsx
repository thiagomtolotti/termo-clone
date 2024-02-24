"use client";

import { GuessRow } from "../GuessRow/GuessRow";
import { useInputs } from "../../hooks/useInputs";

export const GuessArea = () => {
  const { rowsValue, currentPosition } = useInputs();

  return rowsValue.map((rowValue, index) => (
    <GuessRow
      active={currentPosition[0] === index}
      value={rowValue}
      key={index}
      activeIndex={currentPosition[1]}
    />
  ));
};
