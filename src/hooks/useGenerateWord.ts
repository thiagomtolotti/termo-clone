import { useEffect, useState } from "react";
import getValidWords from "../utils/getValidWords";

interface randomWordDataInterface {
  word: string;
  date: string;
}

const useGenerateWord = () => {
  const [word, setWord] = useState<string>();

  async function generateNewWord(): Promise<string> {
    const allWords = await getValidWords();

    const randomWord =
      allWords[Math.floor(Math.random() * allWords.length)].toUpperCase();

    const localStorageObj: randomWordDataInterface = {
      word: randomWord,
      date: new Date().toDateString(),
    };

    localStorage.setItem("randomWordData", JSON.stringify(localStorageObj));

    return randomWord;
  }

  useEffect(() => {
    const storageRandomWord = localStorage.getItem("randomWordData");

    if (!storageRandomWord) {
      generateNewWord().then((newWord) => setWord(newWord));
      return;
    }

    const randomWordData: randomWordDataInterface =
      JSON.parse(storageRandomWord);
    const isValidDate = randomWordData.date === new Date().toDateString();

    if (!isValidDate) {
      generateNewWord().then((newWord) => setWord(newWord));
      return;
    }

    setWord(randomWordData.word);
  }, []);

  useEffect(() => {
    //@ts-expect-error Objeto no window sempre dá erro de compilação
    window.word = word;
  }, [word]);

  return word;
};

export default useGenerateWord;
