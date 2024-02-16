import { fireEvent, render } from "@testing-library/react";
import { GuessRow } from "./GuessRow";

describe("GuessRow element", () => {
  it("Should render correctly", () => {
    const { container } = render(<GuessRow />);

    expect(container).toMatchSnapshot();
  });

  describe("if is active", () => {
    it("Should have at least one active guess", () => {
      const { getAllByRole } = render(<GuessRow active />);

      const guessLetters = getAllByRole("guess");

      const hasActiveGuess = guessLetters.some((guesLetter) =>
        guesLetter.classList.contains("active")
      );

      expect(hasActiveGuess).toBe(true);
    });

    it("Should allow the user to click on the guesses to make it active", () => {
      const { getAllByRole } = render(<GuessRow active />);

      const guessLetters = getAllByRole("guess");

      fireEvent.click(guessLetters[2]);

      expect(guessLetters[2].classList.contains("active")).toBe(true);
      expect(guessLetters[0].classList.contains("active")).toBe(false);
    });

    it("Should allow the user to press the keys to make them active", () => {
      expect(true).toBeFalsy();
    });
  });

  describe("it is not active", () => {
    it("Shouldn't have an active guess", () => {
      const { getAllByRole } = render(<GuessRow />);

      const guessLetters = getAllByRole("guess-wrapper");

      const hasActiveGuess = guessLetters.some((guesLetter) =>
        guesLetter.classList.contains("active")
      );

      expect(hasActiveGuess).toBe(false);
    });
  });
});
