import {
  fireEvent,
  getAllByRole,
  render,
  screen,
} from "@testing-library/react";
import { GuessRow } from "./GuessRow";

// describe("GuessRow element", () => {
//   it("Should render correctly", () => {
//     const { container } = render(<GuessRow />);

//     expect(container).toMatchSnapshot();
//   });

//   describe("if is active", () => {
//     it("Should have at least one active guess", () => {
//       const { getAllByRole } = render(<GuessRow active />);

//       const guessLetters = getAllByRole("guess");

//       const hasActiveGuess = guessLetters.some((guesLetter) =>
//         guesLetter.classList.contains("active")
//       );

//       expect(hasActiveGuess).toBe(true);
//     });

//     it("Should allow the user to click on the guesses to make it active", () => {
//       const { getAllByRole } = render(<GuessRow active />);

//       const guessLetters = getAllByRole("guess");

//       fireEvent.click(guessLetters[2]);

//       expect(guessLetters[2].classList.contains("active")).toBe(true);
//       expect(guessLetters[0].classList.contains("active")).toBe(false);
//     });
//     describe("Arrow clicks", () => {
//       const arrowRightKeyDownEvt = {
//         key: "ArrowRight",
//         code: "ArrowRight",
//       };
//       const arrowLeftKeyDownEvt = {
//         key: "ArrowLeft",
//         code: "ArrowLeft",
//       };

//       it("Should allow to toggle the active guess by clicking the arrows", () => {
//         const { getAllByRole } = render(<GuessRow active />);
//         const guessLetters = getAllByRole("guess");

//         fireEvent.keyDown(document.body, arrowRightKeyDownEvt);

//         expect(guessLetters[1].classList.contains("active")).toBe(true);
//         expect(guessLetters[0].classList.contains("active")).toBe(false);

//         fireEvent.keyDown(document.body, arrowLeftKeyDownEvt);

//         expect(guessLetters[0].classList.contains("active")).toBe(true);
//       });

//       it("Shouldn't allow to go below 0", () => {
//         const { getAllByRole } = render(<GuessRow active />);
//         const guessLetters = getAllByRole("guess");

//         fireEvent.keyDown(document.body, arrowRightKeyDownEvt);

//         expect(guessLetters[1].classList.contains("active")).toBe(true);

//         fireEvent.keyDown(document.body, arrowLeftKeyDownEvt);
//         fireEvent.keyDown(document.body, arrowLeftKeyDownEvt);

//         expect(guessLetters[0].classList.contains("active")).toBe(true);
//       });

//       it("Shouldn't allow to go after max size", () => {
//         const { getAllByRole } = render(<GuessRow active />);

//         const guessLetters = getAllByRole("guess");

//         fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
//         fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
//         fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
//         fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
//         fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
//         fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
//         fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
//         fireEvent.keyDown(document.body, arrowRightKeyDownEvt);
//         fireEvent.keyDown(document.body, arrowRightKeyDownEvt);

//         expect(guessLetters[4].classList.contains("active")).toBe(true);
//       });
//     });

//     // TODO: It should move to the next EMPTY GuessLetter
//     it("Should go to the next GuessLetter when a value is assigned", () => {
//       const keyDownEvent = {
//         key: "T",
//         code: "T",
//       };

//       render(<GuessRow active />);
//       const guessLetters = screen.getAllByRole("guess");

//       expect(guessLetters[0].classList.contains("active")).toBe(true);

//       fireEvent.keyDown(document.body, keyDownEvent);

//       expect(guessLetters[1].classList.contains("active")).toBe(true);
//       expect(guessLetters[0].classList.contains("active")).toBe(false);
//     });
//   });

//   describe("it is not active", () => {
//     it("Shouldn't have an active guess on initial render", () => {
//       const { getAllByRole } = render(<GuessRow />);

//       const guessLetters = getAllByRole("guess-wrapper");

//       const hasActiveGuess = guessLetters.some((guesLetter) =>
//         guesLetter.classList.contains("active")
//       );

//       expect(hasActiveGuess).toBe(false);
//     });
//   });

//   describe("when it becames active", () => {
//     describe("Should have the active guess as the first of the row", () => {
//       test("when the arrow is clicked", () => {
//         const arrowRightKeyDownEvt = {
//           key: "ArrowRight",
//           code: "ArrowRight",
//         };
//         const { rerender } = render(<GuessRow />);
//         const guess = screen.getAllByRole("guess")[0];

//         fireEvent.keyDown(document.body, arrowRightKeyDownEvt);

//         rerender(<GuessRow active />);

//         expect(guess.classList.contains("active")).toBe(true);
//       });

//       test("When there's a mouse click", () => {
//         const { rerender } = render(<GuessRow />);
//         const guess = screen.getAllByRole("guess")[0];
//         const guessWrapper = screen.getAllByRole("guess-wrapper")[2];

//         fireEvent.click(guessWrapper);

//         rerender(<GuessRow active />);

//         expect(guess.classList.contains("active")).toBe(true);
//       });

//       test("When there's keyboard input", () => {
//         const keyDownEvent = {
//           key: "T",
//           code: "T",
//         };

//         const { rerender } = render(<GuessRow />);
//         const guess = screen.getAllByRole("guess")[0];

//         fireEvent.keyDown(document.body, keyDownEvent);

//         rerender(<GuessRow active />);

//         expect(guess.classList.contains("active")).toBe(true);
//       });
//     });
//   });
// });

describe("GuessRow element", () => {
  it("Should render correctly", () => {
    const { container } = render(<GuessRow active />);

    expect(container).toMatchSnapshot();
  });
  it("Should render with the first guess active when the row is te active row", () => {
    render(<GuessRow active />);

    const guesses = screen.getAllByRole("guess");

    guesses.forEach((guess, index) => {
      expect(guess.classList.contains("active")).toBe(index === 0);
    });
  });

  it("Should ignore the inputs that are not letters", () => {
    const keyDownEvent = {
      key: "T",
      code: "T",
    };
    const AltKeyDown = {
      key: "Alt",
      code: "Alt",
    };

    render(<GuessRow active />);

    const guesses = screen.getAllByRole("guess");
    fireEvent.keyDown(document.body, keyDownEvent);

    expect(guesses[0].innerHTML).toBe(keyDownEvent.key);

    fireEvent.keyDown(document.body, AltKeyDown);

    expect(guesses[0].innerHTML).toBe(keyDownEvent.key);
  });

  describe("When there's a letter clicked", () => {
    const keyDownEvent = {
      key: "T",
      code: "T",
    };
    it("Should write the letter on the corresponding guess", () => {
      render(<GuessRow active />);

      const guesses = screen.getAllByRole("guess");

      fireEvent.keyDown(document.body, keyDownEvent);
      fireEvent.keyDown(document.body, keyDownEvent);
      fireEvent.keyDown(document.body, keyDownEvent);
      fireEvent.keyDown(document.body, keyDownEvent);
      fireEvent.keyDown(document.body, keyDownEvent);
      3;

      guesses.forEach((guess) => {
        expect(guess.innerHTML).toBe(keyDownEvent.key);
      });
    });

    it("Should advance to the next guess", () => {
      render(<GuessRow active />);

      const guesses = screen.getAllByRole("guess");

      expect(guesses[0].classList.contains("active")).toBe(true);

      fireEvent.keyDown(document.body, keyDownEvent);

      expect(guesses[1].classList.contains("active")).toBe(true);
    });

    it("Should convert the value to uppercase", () => {
      const lowercaseKeyDownEvent = {
        key: "t",
        code: "t",
      };
      render(<GuessRow active />);

      const guesses = screen.getAllByRole("guess");
      const activeGuess = guesses.find((guess) =>
        guess.classList.contains("active")
      )!;

      fireEvent.keyDown(document.body, lowercaseKeyDownEvent);

      expect(activeGuess.innerHTML).toBe(keyDownEvent.key.toUpperCase());
    });

    it("If there's already a value it should substitute the value", () => {
      const newKeyDownEvent = {
        key: "Z",
        code: "Z",
      };

      render(<GuessRow active />);

      const guesses = screen.getAllByRole("guess");
      fireEvent.keyDown(document.body, keyDownEvent);

      expect(guesses[0].innerHTML).toBe(keyDownEvent.key);

      fireEvent.click(guesses[0]);
      fireEvent.keyDown(document.body, newKeyDownEvent);

      expect(guesses[0].innerHTML).toBe(newKeyDownEvent.key);
    });
  });

  describe("When the backspace is clicked", () => {
    const keyDownEvent = {
      key: "T",
      code: "T",
    };

    const backspaceEvent = {
      key: "Backspace",
      code: "Backspace",
    };

    it("Should erase the value of the active guess", () => {
      render(<GuessRow active />);

      const guesses = screen.getAllByRole("guess");

      const activeGuess = guesses.find((guess) =>
        guess.classList.contains("active")
      )!;

      fireEvent.keyDown(document.body, keyDownEvent);

      expect(activeGuess?.innerHTML).toBe(keyDownEvent.key);

      fireEvent.click(activeGuess);

      fireEvent.keyDown(document.body, backspaceEvent);

      expect(activeGuess?.innerHTML).toBe("");
    });

    it("Should go to the previous guess after the click", () => {
      render(<GuessRow active />);
      const guesses = screen.getAllByRole("guess");

      fireEvent.keyDown(document.body, keyDownEvent);
      fireEvent.keyDown(document.body, keyDownEvent);

      fireEvent.click(guesses[1]);

      fireEvent.keyDown(document.body, backspaceEvent);

      expect(guesses[0].classList.contains("active")).toBe(true);
    });
  });

  describe("When the arrow is clicked", () => {
    const rightArrowClick = {
      key: "ArrowRight",
      code: "ArrowRight",
    };

    const leftArrowClick = {
      key: "ArrowLeft",
      code: "ArrowLeft",
    };

    it("If it's the right arrow it should move one guess forward", () => {
      render(<GuessRow active />);

      const guesses = screen.getAllByRole("guess");

      expect(guesses[0].classList.contains("active")).toBe(true);

      fireEvent.keyDown(document.body, rightArrowClick);

      expect(guesses[0].classList.contains("active")).toBe(false);
      expect(guesses[1].classList.contains("active")).toBe(true);
    });

    it("If it's the left arrow it should move one guess before", () => {
      render(<GuessRow active />);

      const guesses = screen.getAllByRole("guess");

      fireEvent.keyDown(document.body, rightArrowClick);
      fireEvent.keyDown(document.body, rightArrowClick);

      expect(guesses[2].classList.contains("active")).toBe(true);

      fireEvent.keyDown(document.body, leftArrowClick);

      expect(guesses[1].classList.contains("active")).toBe(true);
    });
  });

  describe("when it's not active", () => {
    it("Shouldn't have any active guess", () => {
      render(<GuessRow />);

      const guesses = screen.getAllByRole("guess");

      expect(
        guesses.find((guess) => guess.classList.contains("active"))
      ).toBeFalsy();
    });
  });
});
