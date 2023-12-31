import { useEffect, useRef, useState } from "react";
import styles from "./Guess.module.css";

interface GuessProps {
  value: string;
  active?: boolean;
  handleInput: (ev: React.KeyboardEvent) => void;
}

export const Guess = ({ active = false, handleInput, value }: GuessProps) => {
  const guessRef = useRef<HTMLDivElement>(null);
  // const [value, setValue] = useState("");
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
      className={`${styles.guess} ${isActive && styles.active}`}
      onKeyDown={handleInput}
      tabIndex={0}
    >
      {value}
    </div>
  );
};
