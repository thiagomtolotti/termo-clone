import { fireEvent, render, screen } from "@testing-library/react";
import { GuessArea } from "./GuessArea";

describe("GuessArea component", () => {
  it("Should render correctly", () => {
    const { container } = render(<GuessArea />);

    expect(container.innerHTML).toMatchSnapshot();
  });

  it("The first row should start as the active", () => {
    render(<GuessArea />);

    const rows = screen.getAllByRole("guess-row");

    expect(rows[0].classList.contains("active")).toBe(true);
  });

  it("Should register the guess when 'enter' key is pressed", () => {
    render(<GuessArea />);

    const rows = screen.getAllByRole("guess-row");

    const enterKeyDownEvent = {
      key: "Enter",
      code: "Enter",
    };

    fireEvent.keyDown(document.body, enterKeyDownEvent);

    expect(rows[1].classList.contains("active")).toBe(true);
  });
});
