import { render, screen } from "@testing-library/react";
import { GuessLetter } from "./GuessLetter";

//   describe("if is active", () => {
//     beforeEach(() => {
//       render(<GuessLetter active />);
//       guess = screen.getByRole("guess");
//     });

//   it("If is not active and receives an input it should do nothing", () => {
//     render(<GuessLetter />);

//     const guess = screen.getByRole("guess");

//     fireEvent.keyDown(document.body, keyDownEvent);

//     expect(guess.innerHTML).toBe("");
//   });

//   describe("When active is toggled", () => {
//     it("Should disable the keyDown events when it isn't active", () => {
//       const { rerender } = render(<GuessLetter active />);

//       const guess = screen.getByRole("guess");
//       fireEvent.keyDown(document.body, keyDownEvent);

//       expect(guess.innerHTML).toBe(keyDownEvent.key);

//       rerender(<GuessLetter />);

//       const newKeyDownEvent = {
//         key: "Z",
//         code: "Z",
//       };

//       fireEvent.keyDown(document.body, newKeyDownEvent);

//       expect(guess.innerHTML).toBe(keyDownEvent.key);
//     });

//     it("Should enable the keyDown events when it is active", () => {
//       const { rerender } = render(<GuessLetter />);

//       const guess = screen.getByRole("guess");

//       fireEvent.keyDown(document.body, keyDownEvent);

//       expect(guess.innerHTML).toBe("");

//       rerender(<GuessLetter active />);

//       const newKeyDownEvent = {
//         key: "Z",
//         code: "Z",
//       };

//       fireEvent.keyDown(document.body, newKeyDownEvent);

//       expect(guess.innerHTML).toBe(newKeyDownEvent.key);
//     });
//   });
// });

describe("GuessLetter component", () => {
  it("Should render correctly", () => {
    const { container } = render(<GuessLetter>T</GuessLetter>);

    expect(container).toMatchSnapshot();
  });

  it("Should render correctly if it's active", () => {
    const { container } = render(<GuessLetter active>T</GuessLetter>);

    expect(container).toMatchSnapshot();

    const guessElement = screen.getByRole("guess");
    expect(guessElement.classList.contains("active")).toBe(true);
  });
});
