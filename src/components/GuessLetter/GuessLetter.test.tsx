import { fireEvent, render, screen } from "@testing-library/react";
import { GuessLetter } from "./GuessLetter";

// describe("GuessLetter component", () => {
//   const keyDownEvent = {
//     key: "T",
//     code: "T",
//   };
//   let guess: HTMLElement;

//   it("Should render correctly", () => {
//     const { container } = render(<GuessLetter />);

//     expect(container).toMatchSnapshot();
//   });

//   describe("if is active", () => {
//     beforeEach(() => {
//       render(<GuessLetter active />);
//       guess = screen.getByRole("guess");
//     });

//     it("If receives an input it should have it's inner value set to the input value", () => {
//       fireEvent.keyDown(document.body, keyDownEvent);

//       expect(guess.innerHTML).toBe(keyDownEvent.key);
//     });

//     it("If receives a new value it should substitute it's inner value", () => {
//       fireEvent.keyDown(document.body, keyDownEvent);

//       expect(guess.innerHTML).toBe(keyDownEvent.key);

//       const newKeyDownEvent = {
//         key: "Z",
//         code: "Z",
//       };
//       fireEvent.keyDown(document.body, newKeyDownEvent);

//       expect(guess.innerHTML).toBe(newKeyDownEvent.key);
//     });

//     it("Should convert the value of the key pressed to uppercase", () => {
//       const smallCaseKeyDownEvt = {
//         key: "t",
//         code: "t",
//       };

//       fireEvent.keyDown(document.body, smallCaseKeyDownEvt);

//       expect(guess.innerHTML).toBe(smallCaseKeyDownEvt.key.toUpperCase());
//     });

//     it("Should ignore inputs that are not letters", () => {
//       fireEvent.keyDown(document.body, keyDownEvent);

//       const AltKeyDownEvt = {
//         key: "Alt",
//         code: "Alt",
//       };

//       fireEvent.keyDown(document.body, AltKeyDownEvt);

//       expect(guess.innerHTML).toBe(keyDownEvent.code);
//     });

//     it("Should be empty when backspace is pressed", () => {
//       const backspaceKeyDownEvt = {
//         key: "Backspace",
//         code: "Backspace",
//       };

//       fireEvent.keyDown(document.body, keyDownEvent);
//       fireEvent.keyDown(document.body, backspaceKeyDownEvt);

//       expect(guess.innerHTML).toBe("");
//     });
//   });

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
