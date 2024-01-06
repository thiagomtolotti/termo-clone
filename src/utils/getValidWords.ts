import palavras from "../assets/palavras.txt";

// const INVALID_CHARS = ["-", ".", "/"];

// function hasInvalidChar(word: string): boolean {
//   for (let i = 0; i < INVALID_CHARS.length; i++) {
//     if (word.includes(INVALID_CHARS[i])) {
//       return true;
//     }
//   }

//   return false;
// }

export default async function getValidWords() {
  const response = await fetch(palavras);

  if (!response.ok) {
    throw new Error("Não foi possível pegar as palavras em português");
  }

  const allWordsArr = (await response.text()).split("\n");
  // const wordsWithFiveLetters: string[] = [];

  // allWordsArr.map((word) => {
  //   if (word.length === 5 && !hasInvalidChar(word)) {
  //     const normalizedWord = word.normalize("NFD");
  //     const wordWithoutAccent = normalizedWord.replace(/[\u0300-\u036f]/g, "");

  //     wordsWithFiveLetters.push(wordWithoutAccent.toLowerCase());
  //   }
  // });

  return allWordsArr;
}
