import { useContext } from "react";
import Notification from "./Notification";
import styles from "./Notifications.module.css";
import { NotificationContext } from "../../contexts/NotificationContext";

export const Notifications = () => {
  const { notification } = useContext(NotificationContext);

  return (
    <div className={styles.notificationsContainer}>
      <Notification>{notification}</Notification>
    </div>
  );
};
