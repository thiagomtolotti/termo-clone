import palavras from "../assets/palavras.txt";

export default async function getValidWords() {
  const response = await fetch(palavras);

  if (!response.ok) {
    throw new Error("Não foi possível pegar as palavras em português");
  }

  const allWordsArr = (await response.text()).split("\n");
  const wordsWithFiveLetters: string[] = [];

  allWordsArr.map((word) => {
    if (word.length === 5) {
      wordsWithFiveLetters.push(word);
    }
  });

  return wordsWithFiveLetters;
}
