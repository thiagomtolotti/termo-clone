"use client";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { createContext } from "react";

export interface IApplicationContext {
  Notifications: useNotification;
}

export const ApplicationContext = createContext({} as IApplicationContext);

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const Notifications = useNotification();

  return (
    <ApplicationContext.Provider value={{ Notifications }}>
      {children}
    </ApplicationContext.Provider>
  );
};
