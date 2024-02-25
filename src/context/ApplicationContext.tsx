"use client";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { createContext } from "react";

interface ApplicationContext {
  Notifications: useNotification;
}

export const ApplicationContext = createContext({} as ApplicationContext);

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
