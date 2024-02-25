"use client";
import { createContext } from "react";

interface ApplicationContext {}

export const ApplicationContext = createContext({} as ApplicationContext);

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ApplicationContext.Provider value={{}}>
      {children}
    </ApplicationContext.Provider>
  );
};
