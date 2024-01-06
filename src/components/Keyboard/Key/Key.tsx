import { useContext, useRef } from "react";
import styles from "./Key.module.css";
import { UsedKeysContext } from "../../../contexts/UsedKeysContext";

import backspaceImg from "../../../assets/backspace.svg";

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
      id={children === "Enter" ? styles.enter : ""}
    >
      {children !== "Backspace" ? (
        children
      ) : (
        <img src={backspaceImg} width={28} />
      )}
    </div>
  );
};
