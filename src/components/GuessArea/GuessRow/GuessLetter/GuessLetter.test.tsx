import { render, screen } from "@testing-library/react";
import { GuessLetter } from "./GuessLetter";

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
