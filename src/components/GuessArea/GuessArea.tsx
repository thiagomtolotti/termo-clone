import styles from "./GuessArea.module.css";

import GuessRow from "../GuessRow";

export const GuessArea = () => {
  return (
    <div className={styles.guesses}>
      <GuessRow active></GuessRow>
      <GuessRow></GuessRow>
      <GuessRow></GuessRow>
      <GuessRow></GuessRow>
      <GuessRow></GuessRow>
      <GuessRow></GuessRow>
    </div>
  );
};
