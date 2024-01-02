import GuessArea from "./components/GuessArea";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";

const WORD = "TERMO";

function App() {
  return (
    <>
      <Header />
      <GuessArea word={WORD} />
      <Keyboard />
    </>
  );
}

export default App;
