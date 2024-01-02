import { useEffect, useState } from "react";
import GuessArea from "./components/GuessArea";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import getValidWords from "./utils/getValidWords";

function App() {
  const [word, setWord] = useState<string | null>(null);

  useEffect(() => {
    getValidWords().then((words) => {
      const getRandomWord =
        words[Math.floor(Math.random() * words.length)].toUpperCase();

      setWord(getRandomWord);
    });
  }, []);

  useEffect(() => {
    //@ts-expect-error Objeto no window sempre dá erro de compilação
    window.word = word;
  }, [word]);

  return (
    word !== null && (
      <>
        <Header />
        <GuessArea word={word} />
        <Keyboard />
      </>
    )
  );
}

export default App;
