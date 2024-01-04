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
    const storageIndex = localStorage.getItem("activeIndex");
    const storageDate = localStorage.getItem("lastLoggedDate");

    const isValidDate = storageDate === new Date().toDateString();

    if (storageGuesses && isValidDate) {
      setActiveGuessIndex(Number(storageIndex));
      setGuesses(JSON.parse(storageGuesses));
      return;
    }
  }, []);

  // Seta as palavras válidas
  useEffect(() => {
    getValidWords().then((words) => (validWords.current = words));
  }, []);

  function sendGuess(newGuess: string[], correctWord: string) {
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
    setActiveGuessIndex((index) => index + 1);

    renderNotification("");

    if (newGuess.join("").toUpperCase() === correctWord) {
      renderNotification("Parabéns");
      setActiveGuessIndex(-1);

      return;
    }
  }

  // Recupera as tentaticas do localStorage
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem("guesses", JSON.stringify(guesses));
    localStorage.setItem("activeIndex", String(activeGuessIndex));
  }, [guesses, activeGuessIndex]);

  return { guesses, sendGuess, activeGuessIndex };
};

export default useGuesses;
