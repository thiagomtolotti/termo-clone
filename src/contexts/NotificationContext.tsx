import { createContext, useState } from "react";

interface NotificationProviderProps {
  children: React.ReactNode;
}

interface NotificationContextType {
  notification: string;
  renderNotification: React.Dispatch<React.SetStateAction<string>>;
}

export const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType
);

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notification, renderNotification] = useState<string>("");

  return (
    <NotificationContext.Provider value={{ notification, renderNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
