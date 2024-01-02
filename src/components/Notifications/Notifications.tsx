import Notification from "./Notification";
import styles from "./Notifications.module.css";

export const Notifications = () => {
  return (
    <div className={styles.notificationsContainer}>
      <Notification>Essa palavra não é aceita</Notification>
    </div>
  );
};
