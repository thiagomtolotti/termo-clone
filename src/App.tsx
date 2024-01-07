import { useContext } from "react";
import Footer from "./components/Footer";
import GuessArea from "./components/GuessArea";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import { CorrectWordContext } from "./contexts/CorrectWordContext";

function App() {
  const { word } = useContext(CorrectWordContext);

  return (
    Boolean(word) && (
      <>
        <Header />
        <GuessArea />
        <Keyboard />
        <Footer />
      </>
    )
  );
}

export default App;
