"use server";
import fs from "fs";
import path from "path";
import seedrandom from "seedrandom";

export async function isGuessAWord(guess: string) {
  const allWords = await getAllWords();

  if (!allWords) throw new Error("Couldn't fetch words");

  return allWords.indexOf(guess) !== -1;
}

const getAllWords = async () => {
  const filePath = path.join(process.cwd(), "public", "palavras.txt");

  const data = fs.readFileSync(filePath, "utf8");

  return data.replaceAll("\r", "").toUpperCase().split("\n");
};

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
