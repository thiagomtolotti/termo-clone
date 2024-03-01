import { render } from "@testing-library/react";
import { GuessArea } from "./GuessArea";
import { GuessRow } from "../GuessRow/GuessRow";
import * as useInputsModule from "../../hooks/useInputs/useInputs";

jest.mock("../../hooks/useInputs/useInputs");

jest.mock("../GuessRow/GuessRow");

describe("GuessArea component", () => {
  it("Should render correctly", () => {
    const mockRowsValue = [
      ["T", "E", "S", "T", "E"],
      ["T", "E", "S", "T", "A"],
      ["T", "E", "S", "T", "B"],
      ["T", "E", "S", "T", "C"],
      ["T", "E", "S", "T", "D"],
      ["T", "E", "S", "T", "F"],
    ];
    const mockCurrentPosition = [1, 2];

    (useInputsModule.useInputs as jest.Mock).mockReturnValue({
      rowsValue: mockRowsValue,
      currentPosition: mockCurrentPosition,
    });

    const { container } = render(<GuessArea />);

    expect(container.innerHTML).toMatchSnapshot();
    expect(GuessRow).toHaveBeenCalledTimes(mockRowsValue.length);

    (GuessRow as jest.Mock).mock.calls.forEach((args, index) => {
      const [props] = args;

      expect(props.value).toBe(mockRowsValue[index]);

      if (index === mockCurrentPosition[0]) {
        expect(props.activeIndex).toBe(mockCurrentPosition[1]);
      } else {
        expect(props.activeIndex).toBe(undefined);
      }
    });
  });
});
