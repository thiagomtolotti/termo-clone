import { render, screen } from "@testing-library/react";
import { GuessRow } from "./GuessRow";
import { GuessLetter } from "./GuessLetter/GuessLetter";

jest.mock("../GuessLetter/GuessLetter");

const mockActiveIndex = 0;
const mockValue = ["T", "E", "S", "C", "A"];

describe("GuessRow component", () => {
  it("Should render correctly", () => {
    render(<GuessRow activeIndex={mockActiveIndex} value={mockValue} />);

    const row = screen.getByRole("guess-row");

    expect(GuessLetter).toHaveBeenCalledTimes(mockValue.length);
    expect(row.classList.contains("active")).toBe(true);

    (GuessLetter as jest.Mock).mock.calls.forEach((args, index) => {
      const [props] = args;

      expect(props.children).toBe(mockValue[index]);

      expect(props.active).toBe(index === mockActiveIndex);
    });
  });

  it("Should render correctly without an activeIndex", () => {
    render(<GuessRow value={mockValue} />);

    const row = screen.getByRole("guess-row");

    expect(row.classList.contains("active")).toBe(false);

    (GuessLetter as jest.Mock).mock.calls.forEach((args) => {
      const [props] = args;

      expect(props.active).toBe(false);
    });
  });
});
