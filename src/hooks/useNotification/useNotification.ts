import { useState } from "react";

interface Notification {
  message: string;
  timestamp: number;
}

export interface useNotification {
  renderNotification: (message: string) => void;
  clearNotification: () => void;
  currentNotification: Notification;
}

export const useNotification = () => {
  const [currentNotification, setCurrentNotification] =
    useState<Notification | null>();

  const renderNotification = (message: string) => {
    setCurrentNotification({ message: message, timestamp: Date.now() });
  };

  const clearNotification = () => {
    setCurrentNotification(null);
  };

  return {
    renderNotification,
    clearNotification,
    currentNotification,
  } as useNotification;
};
