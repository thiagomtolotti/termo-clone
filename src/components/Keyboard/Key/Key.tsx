import { useContext, useRef } from "react";
import styles from "./Key.module.css";
import { UsedKeysContext } from "../../../contexts/UsedKeysContext";

interface KeyProps {
  children: string;
}

export const Key = ({ children }: KeyProps) => {
  const keyRef = useRef<HTMLDivElement>(null);
  const { correctLetters, misplacedLetters, wrongLetters } =
    useContext(UsedKeysContext);

  const event = new KeyboardEvent("keydown", {
    key: children,
    code: children,
  });

  return (
    <div
      className={`${styles.key} ${
        correctLetters.indexOf(children.toUpperCase()) !== -1
          ? styles.correct
          : misplacedLetters.indexOf(children.toUpperCase()) !== -1
          ? styles.misplaced
          : wrongLetters.indexOf(children.toUpperCase()) !== -1
          ? styles.wrong
          : ""
      }`}
      ref={keyRef}
      onClick={() => {
        document.dispatchEvent(event);
      }}
    >
      {children}
    </div>
  );
};
