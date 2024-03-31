import styles from "./GuessLetter.module.css";

interface GuessLetterProps {
  children: React.ReactNode;
  active?: boolean;
  isCorrectOrMisplaced?: "correct" | "misplaced";
  onClick(): void;
}

export const GuessLetter = ({
  active = false,
  children,
  isCorrectOrMisplaced,
  onClick,
}: GuessLetterProps) => {
  return (
    <div
      role="guess"
      className={`${styles.guess} ${active ? styles.active : ""} ${
        isCorrectOrMisplaced ? styles[isCorrectOrMisplaced] : ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
