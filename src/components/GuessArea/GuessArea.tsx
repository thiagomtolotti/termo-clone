"use client";

import { useEffect, useState } from "react";
import { GuessRow } from "../GuessRow/GuessRow";

const NUMBER_OF_GUESSES = 6;

export const GuessArea = () => {
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    const handleEnterClick = (ev: KeyboardEvent) => {
      if (!ev.key.toLowerCase().includes("enter")) return;

      setActiveRow((activeRow) =>
        Math.min(activeRow + 1, NUMBER_OF_GUESSES - 1)
      );
    };

    document.addEventListener("keydown", handleEnterClick);

    return () => {
      document.removeEventListener("keydown", handleEnterClick);
    };
  }, [activeRow]);

  return [...Array(NUMBER_OF_GUESSES)].map((_, index) => (
    <GuessRow active={index === activeRow} />
  ));
};
