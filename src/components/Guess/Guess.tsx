import { useEffect, useRef, useState } from "react";
import styles from "./Guess.module.css";

interface GuessProps {
  value: string;
  active?: boolean;
  blocked?: boolean;
  handleInput: (ev: React.KeyboardEvent) => void;
  position?: "misplaced" | "correct" | "";
}

export const Guess = ({
  active = false,
  handleInput,
  value,
  blocked = false,
  position,
}: GuessProps) => {
  const guessRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    if (!isActive) return;

    guessRef.current?.focus();
  }, [isActive]);

  return (
    <div
      ref={guessRef}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      className={`
        ${styles.guess}
        ${isActive && !blocked && styles.active}
        ${blocked && styles.blocked}
        ${position === "misplaced" && styles.misplaced}
        ${position === "correct" && styles.correct}`}
      onKeyDown={handleInput}
      tabIndex={0}
    >
      {value}
    </div>
  );
};
