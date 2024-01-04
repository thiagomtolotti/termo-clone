import { createContext, useState } from "react";

interface UsedKeysProviderProps {
  children: React.ReactNode;
}

interface UsedKeysContextType {
  correctLetters: string[];
  setCorrectLetters: React.Dispatch<React.SetStateAction<string[]>>;
  misplacedLetters: string[];
  setMisplacedLetters: React.Dispatch<React.SetStateAction<string[]>>;
  wrongLetters: string[];
  setWrongLetters: React.Dispatch<React.SetStateAction<string[]>>;
}

export const UsedKeysContext = createContext<UsedKeysContextType>(
  {} as UsedKeysContextType
);

export const UsedKeysProvider = ({ children }: UsedKeysProviderProps) => {
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [misplacedLetters, setMisplacedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);

  return (
    <UsedKeysContext.Provider
      value={{
        correctLetters,
        setCorrectLetters,
        misplacedLetters,
        setMisplacedLetters,
        wrongLetters,
        setWrongLetters,
      }}
    >
      {children}
    </UsedKeysContext.Provider>
  );
};
