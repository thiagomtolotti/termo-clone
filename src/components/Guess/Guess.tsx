import styles from "./Guess.module.css";

interface GuessProps {
  active?: boolean;
  children?: string;
  onClick?: React.MouseEventHandler;
  onKeyDown: React.KeyboardEventHandler;
}

export const Guess = ({
  children,
  active = false,
  onClick,
  onKeyDown,
}: GuessProps) => {
  return (
    <div
      className={`${styles.guess} ${active && styles.active}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {" "}
      {children}{" "}
    </div>
  );
};
