"use client";

import { useState } from "react";
import styles from "./GuessLetter.module.css";

interface GuessLetterProps {
  active?: boolean;
}

const letterRegex = /^[a-zA-Z]$/;

export const GuessLetter = ({ active = false }: GuessLetterProps) => {
  const [value, setValue] = useState("");

  document.addEventListener("keydown", (ev) => {
    if (!active) return;

    const keyPressed = ev.key;

    if (keyPressed === "Backspace") {
      setValue("");
    }

    if (!letterRegex.test(keyPressed)) return;

    setValue(keyPressed.toUpperCase());
  });

  return (
    <div role="guess" className={styles.guess}>
      {value}
    </div>
  );
};
