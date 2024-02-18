import {
  fireEvent,
  getAllByRole,
  render,
  screen,
} from "@testing-library/react";
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
    describe("Arrow clicks", () => {
      const arrowRightKeyDownEvt = {
        key: "ArrowRight",
        code: "ArrowRight",
      };
      const arrowLeftKeyDownEvt = {
        key: "ArrowLeft",
        code: "ArrowLeft",
      };

      it("Should allow to toggle the active guess by clicking the arrows", () => {
        const { getAllByRole } = render(<GuessRow active />);
        const guessLetters = getAllByRole("guess");

        fireEvent.keyDown(document.body, arrowRightKeyDownEvt);

        expect(guessLetters[1].classList.contains("active")).toBe(true);
        expect(guessLetters[0].classList.contains("active")).toBe(false);

        fireEvent.keyDown(document.body, arrowLeftKeyDownEvt);

        expect(guessLetters[0].classList.contains("active")).toBe(true);
      });

      it("Shouldn't allow to go below 0", () => {
        const { getAllByRole } = render(<GuessRow active />);
        const guessLetters = getAllByRole("guess");

        fireEvent.keyDown(document.body, arrowRightKeyDownEvt);

        expect(guessLetters[1].classList.contains("active")).toBe(true);

        fireEvent.keyDown(document.body, arrowLeftKeyDownEvt);
        fireEvent.keyDown(document.body, arrowLeftKeyDownEvt);

        expect(guessLetters[0].classList.contains("active")).toBe(true);
      });

      it("Shouldn't allow to go after max size", () => {
        const { getAllByRole } = render(<GuessRow active />);

        const guessLetters = getAllByRole("guess");

        fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
        fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
        fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
        fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
        fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
        fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
        fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
        fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
        fireEvent.keyDown(document.body, arrowRightKeyDownEvt);

        expect(guessLetters[4].classList.contains("active")).toBe(true);
      });
    });

    // TODO: It should move to the next EMPTY GuessLetter
    it("Should go to the next GuessLetter when a value is assigned", () => {
      const keyDownEvent = {
        key: "T",
        code: "T",
      };

      render(<GuessRow active />);
      const guessLetters = screen.getAllByRole("guess");

      expect(guessLetters[0].classList.contains("active")).toBe(true);

      fireEvent.keyDown(document.body, keyDownEvent);

      expect(guessLetters[1].classList.contains("active")).toBe(true);
      expect(guessLetters[0].classList.contains("active")).toBe(false);
    });
  });

  describe("it is not active", () => {
    it("Shouldn't have an active guess on initial render", () => {
      const { getAllByRole } = render(<GuessRow />);

      const guessLetters = getAllByRole("guess-wrapper");

      const hasActiveGuess = guessLetters.some((guesLetter) =>
        guesLetter.classList.contains("active")
      );

      expect(hasActiveGuess).toBe(false);
    });
  });

  describe("when it becames active", () => {
    describe("Should have the active guess as the first of the row", () => {
      test("when the arrow is clicked", () => {
        const arrowRightKeyDownEvt = {
          key: "ArrowRight",
          code: "ArrowRight",
        };
        const { rerender } = render(<GuessRow />);
        const guess = screen.getAllByRole("guess")[0];

        fireEvent.keyDown(document.body, arrowRightKeyDownEvt);

        rerender(<GuessRow active />);

        expect(guess.classList.contains("active")).toBe(true);
      });

      test("When there's a mouse click", () => {
        const { rerender } = render(<GuessRow />);
        const guess = screen.getAllByRole("guess")[0];
        const guessWrapper = screen.getAllByRole("guess-wrapper")[2];

        fireEvent.click(guessWrapper);

        rerender(<GuessRow active />);

        expect(guess.classList.contains("active")).toBe(true);
      });

      test("When there's keyboard input", () => {
        const keyDownEvent = {
          key: "T",
          code: "T",
        };

        const { rerender } = render(<GuessRow />);
        const guess = screen.getAllByRole("guess")[0];

        fireEvent.keyDown(document.body, keyDownEvent);

        rerender(<GuessRow active />);

        expect(guess.classList.contains("active")).toBe(true);
      });
    });
  });
});
