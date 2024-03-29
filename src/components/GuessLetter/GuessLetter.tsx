import styles from "./GuessLetter.module.css";

interface GuessLetterProps {
  children: React.ReactNode;
  active?: boolean;
  isCorrectOrMisplaced?: "correct" | "misplaced";
}

export const GuessLetter = ({
  active = false,
  children,
  isCorrectOrMisplaced,
}: GuessLetterProps) => {
  return (
    <div
      role="guess"
      className={`${styles.guess} ${active ? styles.active : ""} ${
        isCorrectOrMisplaced ? styles[isCorrectOrMisplaced] : ""
      }`}
    >
      {children}
    </div>
  );
};
