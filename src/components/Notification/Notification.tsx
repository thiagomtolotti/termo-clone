"use client";
import { useContext } from "react";
import styles from "./Notification.module.css";
import { ApplicationContext } from "../../context/ApplicationContext";

export const Notification = () => {
  const { Notifications } = useContext(ApplicationContext);

  return (
    <div className={`w-full h-14 flex-shrink-0`}>
      {Notifications?.currentNotification && (
        <div
          className={styles.notification}
          role="notification"
          key={Notifications.currentNotification.timestamp}
        >
          {Notifications.currentNotification.message}
        </div>
      )}
    </div>
  );
};
