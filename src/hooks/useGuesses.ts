import { useContext, useEffect, useRef, useState } from "react";
import { DeviceContext } from "../contexts/NotificationContext";
import getValidWords from "../utils/getValidWords";

const useGuesses = () => {
  const { renderNotification } = useContext(DeviceContext);
  const validWords = useRef<string[]>();

  const NUMBER_OF_GUESSES = 6;

  const blankGuesses = Array(NUMBER_OF_GUESSES).fill(Array(5).fill(""));

  const [guesses, setGuesses] = useState<string[][]>(blankGuesses);
  const [activeGuessIndex, setActiveGuessIndex] = useState(0);

  // Tenta ler as tentativas no localStorage
  useEffect(() => {
    const storageGuesses = localStorage.getItem("guesses");
    const storageDate = localStorage.getItem("lastLoggedDate");

    const isValidDate = storageDate === new Date().toDateString();

    if (storageGuesses && isValidDate) {
      setGuesses(JSON.parse(storageGuesses));
      return;
    }
  }, []);

  // Seta as palavras válidas
  useEffect(() => {
    getValidWords().then((words) => (validWords.current = words));
  }, []);

  function sendGuess(newGuess: string[]) {
    if (newGuess.indexOf("") !== -1) {
      renderNotification("Só palavras com 5 letras");
      return;
    }

    if (validWords.current?.indexOf(newGuess.join("")) === -1) {
      renderNotification("Essa palavra não é aceita");
      return;
    }

    const newGuesses = [...guesses];
    newGuesses[activeGuessIndex] = newGuess;

    setGuesses(newGuesses);
  }

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem("guesses", JSON.stringify(guesses));
  }, [guesses]);

  useEffect(() => {
    guesses.forEach((guess, index) => {
      if (guess.indexOf("") !== -1) return;

      setActiveGuessIndex(index);
    });
  }, [guesses]);

  return { guesses, sendGuess, activeGuessIndex, setActiveGuessIndex };
};

export default useGuesses;
