import { useEffect, useRef, useState } from "react";
import styles from "./Guess.module.css";

interface GuessProps {
  value: string;
  active?: boolean;
  blocked?: boolean;
  handleInput: (ev: React.KeyboardEvent) => void;
}

export const Guess = ({
  active = false,
  handleInput,
  value,
  blocked = false,
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
        ${blocked && styles.blocked}`}
      onKeyDown={handleInput}
      tabIndex={0}
    >
      {value}
    </div>
  );
};
