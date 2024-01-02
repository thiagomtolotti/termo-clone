import { useContext } from "react";
import Notification from "./Notification";
import styles from "./Notifications.module.css";
import { DeviceContext } from "../../contexts/NotificationContext";

export const Notifications = () => {
  const { notification } = useContext(DeviceContext);

  return (
    <div className={styles.notificationsContainer}>
      <Notification>{notification}</Notification>
    </div>
  );
};
