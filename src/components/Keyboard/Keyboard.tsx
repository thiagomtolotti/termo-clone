import styles from "./Keyboard.module.css";
import { Key } from "./Key/Key";

// prettier-ignore
const LETTER_POSITIONS = [
  "Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Backspace","Z","X","C","V","B","N","M", "Enter",
];

export const Keyboard = () => {
  return (
    <div className={styles.keyboard}>
      {LETTER_POSITIONS.map((letter) => (
        <Key>{letter}</Key>
      ))}
    </div>
  );
};
