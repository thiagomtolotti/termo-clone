import { useEffect, useState } from "react";
import getValidWords from "../utils/getValidWords";
import seedrandom from "seedrandom";

const useGenerateWord = () => {
  const [word, setWord] = useState<string>();

  async function generateNewWord(): Promise<string> {
    const allWords = await getValidWords();

    const currentDate = new Date();
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    const wordIndex = Math.floor(
      seedrandom(currentDate.getTime())() * allWords.length
    );

    const randomWord = allWords[wordIndex];

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
