import { useEffect, useState } from "react";
import styles from "../Notifications.module.css";

interface NotificationProps {
  children: string;
}

export const Notification = ({ children }: NotificationProps) => {
  const [render, setRenderAgain] = useState(false);

  useEffect(() => {
    setRenderAgain(false);

    if (!children) return;

    setTimeout(() => setRenderAgain(true), 0);
  }, [children]);

  return render && <div className={styles.notification}>{children}</div>;
};
