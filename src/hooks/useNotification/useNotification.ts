import { ApplicationContext } from "@/context/ApplicationContext";
import { useContext } from "react";

export interface useNotification {
  renderNotification: (message: string) => void;
  clearNotification: () => void;
}

export const useNotification = () => {
  const { Notifications } = useContext(ApplicationContext);

  const renderNotification = (message: string) => {
    Notifications.setCurrentNotification({
      message: message,
      timestamp: Date.now(),
    });
  };

  const clearNotification = () => {
    Notifications.setCurrentNotification(null);
  };

  return {
    renderNotification,
    clearNotification,
  } as useNotification;
};
