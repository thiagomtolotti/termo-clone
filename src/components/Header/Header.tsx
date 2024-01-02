import Notifications from "../Notifications";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.superior}>
      <header className={styles.header}>
        <h1>Termo</h1>
      </header>

      <Notifications />
    </div>
  );
};
