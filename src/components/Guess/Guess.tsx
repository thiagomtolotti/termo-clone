import { useEffect, useRef, useState } from "react";
import styles from "./Guess.module.css";

interface GuessProps {
  value: string;
  active?: boolean;
  blocked?: boolean;
  handleInput: (ev: KeyboardEvent) => void;
  position?: "misplaced" | "correct" | "";
  index: number;
  handleClick: (index: number) => void;
}

export const Guess = ({
  active = false,
  handleInput,
  value,
  blocked = false,
  position,
  index,
  handleClick,
}: GuessProps) => {
  const guessRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    if (!isActive) return;

    guessRef.current?.focus();

    document.addEventListener("keydown", handleInput);

    return () => {
      document.removeEventListener("keydown", handleInput);
    };
  }, [isActive, handleInput]);

  return (
    <div
      ref={guessRef}
      className={`
        ${styles.guess}
        ${isActive && !blocked && styles.active}
        ${blocked && styles.blocked}
        ${position === "misplaced" && styles.misplaced}
        ${position === "correct" && styles.correct}`}
      tabIndex={0}
      onClick={() => handleClick(index)}
    >
      {value}
    </div>
  );
};
