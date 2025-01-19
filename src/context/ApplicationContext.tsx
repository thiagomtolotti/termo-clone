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
    getWordOfTheDay().then((correctWordData) => {
      setCorrectWord(correctWordData.word);

      if (localStorage.getItem("date") === String(correctWordData.date)) return;

      localStorage.clear();
      localStorage.setItem("date", String(correctWordData.date));
      localStorage.setItem("guesses", "");
    });
  }, []);

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
