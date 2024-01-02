import GuessArea from "./components/GuessArea";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import useGenerateWord from "./hooks/useGenerateWord";

function App() {
  const word = useGenerateWord();

  return (
    word && (
      <>
        <Header />
        <GuessArea word={word} />
        <Keyboard />
      </>
    )
  );
}

export default App;
