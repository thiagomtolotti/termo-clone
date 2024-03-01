"use client";
import { createContext, useState } from "react";

interface Notification {
  message: string;
  timestamp: number;
}

export interface IApplicationContext {
  Notifications: {
    currentNotification: Notification | null;
    setCurrentNotification: React.Dispatch<
      React.SetStateAction<Notification | null>
    >;
  };
}

export const ApplicationContext = createContext({} as IApplicationContext);

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentNotification, setCurrentNotification] =
    useState<Notification | null>(null);

  return (
    <ApplicationContext.Provider
      value={{ Notifications: { currentNotification, setCurrentNotification } }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
