import { useRef } from "react";
import styles from "./Key.module.css";

interface KeyProps {
  children: string;
  state: "misplaced" | "wrong" | "correct";
}

export const Key = ({ children, state }: KeyProps) => {
  const keyRef = useRef<HTMLDivElement>(null);

  const event = new KeyboardEvent("keydown", {
    key: children,
    code: children,
  });

  return (
    <div
      className={`${styles.key} ${styles[state]}`}
      ref={keyRef}
      onClick={() => {
        document.dispatchEvent(event);
      }}
    >
      {children}
    </div>
  );
};
