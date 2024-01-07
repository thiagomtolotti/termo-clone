import { useContext } from "react";

import { CorrectWordContext } from "./contexts/CorrectWordContext";

import Footer from "./components/Footer";
import GuessArea from "./components/GuessArea";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import Notifications from "./components/Notifications";

function App() {
  const { word } = useContext(CorrectWordContext);

  return (
    Boolean(word) && (
      <>
        <Header />
        <Notifications />
        <GuessArea />
        <Keyboard />
        <Footer />
      </>
    )
  );
}

export default App;
