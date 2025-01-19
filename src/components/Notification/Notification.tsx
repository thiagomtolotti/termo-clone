"use client";
import { useContext } from "react";
import styles from "./Notification.module.css";
import { ApplicationContext } from "../../context/ApplicationContext";

export const Notification = () => {
  const { Notifications } = useContext(ApplicationContext);

  return (
    <div
      className={`w-full h-12 flex-shrink-0 flex items-center justify-center`}
    >
      {Notifications?.currentNotification && (
        <div
          className={`bg-blue py-2 px-9 rounded-xl text-lg notification `}
          role="notification"
          key={Notifications.currentNotification.timestamp}
        >
          {Notifications.currentNotification.message}
        </div>
      )}
    </div>
  );
};
