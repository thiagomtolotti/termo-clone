"use client";

import { useState } from "react";
import { GuessLetter } from "../GuessLetter/GuessLetter";
import styles from "./GuessRow.module.css";

const WORD_SIZE = 5;

interface GuessRowProps {
  active?: boolean;
}

export const GuessRow = ({ active = false }: GuessRowProps) => {
  const [activeGuessIndex, setActiveGuessIndex] = useState(active ? 0 : null);

  return [...Array(WORD_SIZE)].map((_, index) => (
    <div
      onClick={() => {
        setActiveGuessIndex(index);
      }}
      role="guess-wrapper"
    >
      <GuessLetter active={activeGuessIndex === index} />
    </div>
  ));
};
