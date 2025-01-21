"use server";
import seedrandom from "seedrandom";

const getAllWords = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/palavras.txt`);

  if (!res.ok) throw new Error("Fetching words error");

  const allWords = await res.text();
  return allWords.replaceAll("\r", "").toUpperCase().split("\n");
};

export async function isGuessAWord(guess: string) {
  const allWords = await getAllWords();

  if (!allWords) throw new Error("Couldn't fetch words");

  return allWords.indexOf(guess) !== -1;
}

export async function getWordOfTheDay() {
  const allWords = await getAllWords();

  if (!allWords) throw new Error("Couldn't fetch words");

  const currentDate = new Date();
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  const wordIndex = Math.floor(
    seedrandom(String(currentDate.getTime()))() * allWords.length
  );

  const randomWord = allWords[wordIndex];

  return {
    word: randomWord,
    date: currentDate,
  };
}
