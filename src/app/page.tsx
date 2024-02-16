import { GuessLetter } from "@/components/GuessLetter/GuessLetter";
import { Header } from "@/components/Header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <GuessLetter active />
      <GuessLetter />
    </>
  );
}
