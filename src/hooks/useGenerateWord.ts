import { useEffect, useState } from "react";
import getValidWords from "../utils/getValidWords";

const useGenerateWord = () => {
  const [word, setWord] = useState<string>();

  async function generateNewWord(): Promise<string> {
    const allWords = await getValidWords();

    const randomWord =
      allWords[Math.floor(Math.random() * allWords.length)].toUpperCase();

    localStorage.setItem("randomWord", randomWord);
    localStorage.setItem("lastLoggedDate", new Date().toDateString());

    return randomWord;
  }

  useEffect(() => {
    const storageRandomWord = localStorage.getItem("randomWord");
    const storageDate = localStorage.getItem("lastLoggedDate");

    const isValidDate = storageDate === new Date().toDateString();

    if (!isValidDate) {
      localStorage.clear();
    }

    if (!storageRandomWord || !isValidDate) {
      generateNewWord().then((newWord) => setWord(newWord));
      return;
    }

    setWord(storageRandomWord);
  }, []);

  useEffect(() => {
    //@ts-expect-error Objeto no window sempre dá erro de compilação
    window.word = word;
  }, [word]);

  return word;
};

export default useGenerateWord;
