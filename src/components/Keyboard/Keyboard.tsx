import styles from "./Keyboard.module.css";

import Key from "./Key";

const KEYS = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];

export const Keyboard = () => {
  return (
    <div className={styles.keyboard}>
      {KEYS.map((key) => (
        <Key key={key}>{key}</Key>
      ))}
    </div>
  );
};
