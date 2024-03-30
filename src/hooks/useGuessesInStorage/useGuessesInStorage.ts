export const useGuessesInStorage = () => {
  function getGuessesInStorage() {
    const guessesInStorage = localStorage.getItem("guesses");

    if (!guessesInStorage) return null;

    return JSON.parse(guessesInStorage) as string[][];
  }

  function getInitialPosition() {
    if (localStorage.getItem("isCorrect")) return -1;

    let index = 0;

    const guessesInStorage = getGuessesInStorage();
    if (!guessesInStorage) return 0;

    guessesInStorage.map((guess) => {
      if (guess.indexOf("") !== -1) return;

      index++;
    });

    return index;
  }

  return {
    guessesInStorage: getGuessesInStorage(),
    positionInStorage: getInitialPosition(),
  };
};
