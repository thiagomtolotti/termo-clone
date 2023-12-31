import styles from "./GuessRow.module.css";

import Guess from "../Guess";
import { useEffect, useState } from "react";

interface GuessRowProps {
  active?: boolean;
  children?: string;
}

export const GuessRow = ({ active = false, children = "" }: GuessRowProps) => {
  const [value, setValue] = useState<string[]>(Array(5));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!children) return;

    setValue(children.split(""));
  }, [children]);

  function handleGuessClick(number: number) {
    if (!active) return;

    setActiveIndex(number);
  }

  function handleGuessInput(ev: React.KeyboardEvent) {
    if (!active) return;

    setValue((value) => {
      const newValue = [...value];

      newValue[activeIndex] = ev.key;

      return newValue;
    });

    setActiveIndex((index) => index + 1);
  }

  return (
    <div
      className={`${styles.guessRow} ${
        !active ? styles.inactive : styles.active
      }`}
    >
      {[...Array(5)].map((_, index) => (
        <Guess
          active={active && activeIndex === index}
          key={index}
          onClick={() => handleGuessClick(index)}
          onKeyDown={handleGuessInput}
        >
          {value[index]}
        </Guess>
      ))}
    </div>
  );
};
