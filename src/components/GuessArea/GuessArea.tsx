"use client";

import { GuessRow } from "../GuessRow/GuessRow";
import { useInputs } from "../hooks/useInputs";

export const GuessArea = () => {
  const { rowsValue, currentRow, currentGuessIndex } = useInputs();

  return rowsValue.map((rowValue, index) => (
    <GuessRow
      active={currentRow === index}
      value={rowValue}
      key={index}
      activeIndex={currentGuessIndex}
    />
  ));
};
