"use server";
import fs from "fs";
import path from "path";
import seedrandom from "seedrandom";

export async function isGuessAWord(guess: string) {
  const allWords = await getAllWords();

  return allWords.indexOf(guess) !== -1;
}

const getAllWords = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/palavras.txt`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch palavras.txt");
  }

  const allWords = await res.text();
  return allWords.replaceAll("\r", "").toUpperCase().split("\n");
};

export async function getWordOfTheDay() {
  const allWords = await getAllWords();

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
