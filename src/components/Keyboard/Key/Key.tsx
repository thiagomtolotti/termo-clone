import { useRef } from "react";
import styles from "./Key.module.css";

interface KeyProps {
  children: string;
}

export const Key = ({ children }: KeyProps) => {
  const keyRef = useRef<HTMLDivElement>(null);

  const event = new KeyboardEvent("keydown", {
    key: children,
    code: children,
  });

  return (
    <div
      className={styles.key}
      ref={keyRef}
      onClick={() => {
        document.dispatchEvent(event);
      }}
    >
      {children}
    </div>
  );
};
