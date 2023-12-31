import GuessArea from "./components/GuessArea";
import Header from "./components/Header";

const WORD = "TERMO";

function App() {
  return (
    <>
      <Header />
      <GuessArea word={WORD} />
    </>
  );
}

export default App;
