"use client";
import { getWordOfTheDay } from "@/lib/actions";
import { createContext, useEffect, useState } from "react";

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
  correctWord: string | undefined;
}

export const ApplicationContext = createContext({} as IApplicationContext);

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentNotification, setCurrentNotification] =
    useState<Notification | null>(null);

  const [correctWord, setCorrectWord] = useState<string>();

  useEffect(() => {
    getWordOfTheDay().then((correctWord) => setCorrectWord(correctWord));
  }, []);

  useEffect(() => {
    console.log(correctWord);
  }, [correctWord]);

  return (
    <ApplicationContext.Provider
      value={{
        Notifications: { currentNotification, setCurrentNotification },
        correctWord,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
