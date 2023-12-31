import { useEffect, useRef, useState } from "react";
import styles from "./Guess.module.css";

interface GuessProps {
  active?: boolean;
  handleInput: (
    ev: React.KeyboardEvent,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => void;
}

export const Guess = ({ active = false, handleInput }: GuessProps) => {
  const guessRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
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
      onKeyDown={(ev) => handleInput(ev, setValue)}
      tabIndex={0}
    >
      {value}
    </div>
  );
};
