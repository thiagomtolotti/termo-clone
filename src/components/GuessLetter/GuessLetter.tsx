"use client";

import { useEffect, useState } from "react";
import styles from "./GuessLetter.module.css";

interface GuessLetterProps {
  active?: boolean;
}

const letterRegex = /^[a-zA-Z]$/;

export const GuessLetter = ({ active = false }: GuessLetterProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (!active) return;

      const keyPressed = ev.key;

      if (keyPressed === "Backspace") {
        setValue("");

        return;
      }

      if (!letterRegex.test(keyPressed)) return;

      setValue(keyPressed.toUpperCase());
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active]);

  return (
    <div
      role="guess"
      className={`${styles.guess} ${active ? styles.active : ""}`}
    >
      {value}
    </div>
  );
};