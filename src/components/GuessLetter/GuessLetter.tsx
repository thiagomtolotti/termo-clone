import styles from "./GuessLetter.module.css";

interface GuessLetterProps {
  active?: boolean;
  children: React.ReactNode;
}

export const GuessLetter = ({ active = false, children }: GuessLetterProps) => {
  return (
    <div
      role="guess"
      className={`${styles.guess} ${active ? styles.active : ""}`}
    >
      {children}
    </div>
  );
};
