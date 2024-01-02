import styles from "../Notifications.module.css";

interface NotificationProps {
  children: string;
}

export const Notification = ({ children }: NotificationProps) => {
  return <div className={styles.notification}>{children}</div>;
};
