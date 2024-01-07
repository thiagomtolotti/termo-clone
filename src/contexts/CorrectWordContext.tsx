import { createContext } from "react";
import useGenerateWord from "../hooks/useGenerateWord";

interface ICorrectWord {
  word: string;
}

export const CorrectWordContext = createContext<ICorrectWord>(
  {} as ICorrectWord
);

export const CorrectWordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const word = useGenerateWord();

  return (
    <CorrectWordContext.Provider value={{ word }}>
      {children}
    </CorrectWordContext.Provider>
  );
};
