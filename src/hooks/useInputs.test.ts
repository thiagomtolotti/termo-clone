import { fireEvent, renderHook } from "@testing-library/react";
import { useInputs } from "./useInputs";

describe("useInputs hook", () => {
  let hookResult: {
    current: {
      rowsValue: string[][];
      currentPosition: number[];
    };
  };

  beforeEach(() => {
    const { result } = renderHook(useInputs);

    hookResult = result;
  });

  it("Should return the initial values", () => {
    expect(hookResult.current.currentPosition[0]).toBe(0);
    expect(hookResult.current.currentPosition[1]).toBe(0);
    expect(hookResult.current.rowsValue).toHaveLength(6);

    hookResult.current.rowsValue.map((rowValue) => {
      expect(rowValue.findIndex((value) => value !== "")).toBe(-1);
    });
  });

  it("Shouldn't allow the active column to be beyond the size of the word", () => {
    const rightArrowClick = {
      key: "ArrowRight",
      code: "ArrowRight",
    };

    fireEvent.keyDown(document.body, rightArrowClick);
    fireEvent.keyDown(document.body, rightArrowClick);
    fireEvent.keyDown(document.body, rightArrowClick);
    fireEvent.keyDown(document.body, rightArrowClick);
    fireEvent.keyDown(document.body, rightArrowClick);
    fireEvent.keyDown(document.body, rightArrowClick);

    expect(hookResult.current.currentPosition[1]).toBe(4);
  });

  it("Shouldn't allow the active column to be below the beginning of the word", () => {
    const leftArrowClick = {
      key: "ArrowLeft",
      code: "ArrowLeft",
    };

    fireEvent.keyDown(document.body, leftArrowClick);

    expect(hookResult.current.currentPosition[1]).toBe(0);
  });

  describe("When a key is pressed", () => {
    const keyDownEvent = {
      key: "T",
      code: "T",
    };
    const backspaceEvent = {
      key: "Backspace",
      code: "Backspace",
    };

    it("Should ignore inputs that are not valid", () => {
      const AltKeyDown = {
        key: "Alt",
        code: "Alt",
      };

      fireEvent.keyDown(document.body, AltKeyDown);

      expect(hookResult.current.currentPosition[0]).toBe(0);
      expect(hookResult.current.currentPosition[1]).toBe(0);

      hookResult.current.rowsValue.map((rowValue) => {
        expect(rowValue.findIndex((value) => value !== "")).toBe(-1);
      });
    });

    describe("When it's a letter", () => {
      const lowercaseKeyDownEvent = {
        key: "t",
        code: "t",
      };

      it("Should write it and move the active guess", () => {
        fireEvent.keyDown(document.body, keyDownEvent);

        const rowsValue = hookResult.current.rowsValue;
        const activeRow = hookResult.current.currentPosition[0];
        const activeCol = hookResult.current.currentPosition[1];

        expect(activeRow).toBe(0);
        expect(activeCol).toBe(1);

        expect(rowsValue[activeRow].join("").replaceAll(",", "")).toBe("T");
      });

      it("Should convert the value to uppercase", () => {
        fireEvent.keyDown(document.body, lowercaseKeyDownEvent);

        const rowsValue = hookResult.current.rowsValue;
        const activeRow = hookResult.current.currentPosition[0];

        expect(rowsValue[activeRow][0]).toBe("T");
      });

      it("Should substitute the value if there already had a value in the position", () => {
        const newKeyDownEvent = {
          key: "Z",
          code: "Z",
        };

        fireEvent.keyDown(document.body, keyDownEvent);

        const rowsValue = hookResult.current.rowsValue;
        const activeRow = hookResult.current.currentPosition[0];

        expect(rowsValue[activeRow][0]).toBe("T");

        hookResult.current.currentPosition[1] = 0;

        fireEvent.keyDown(document.body, newKeyDownEvent);

        expect(rowsValue[activeRow][0]).toBe("Z");
      });
    });

    describe("When is the backspace", () => {
      it("Should erase the value of the active guess", () => {
        fireEvent.keyDown(document.body, keyDownEvent);

        const rowsValue = hookResult.current.rowsValue;
        const activeRow = hookResult.current.currentPosition[0];

        expect(rowsValue[activeRow][0]).toBe("T");

        hookResult.current.currentPosition[1] = 0;

        fireEvent.keyDown(document.body, backspaceEvent);

        expect(rowsValue[activeRow][0]).toBe("");
      });

      it("Should go back to the previous column", () => {
        fireEvent.keyDown(document.body, keyDownEvent);
        fireEvent.keyDown(document.body, keyDownEvent);

        const rowsValue = hookResult.current.rowsValue;
        const activeRow = hookResult.current.currentPosition[0];

        expect(rowsValue[activeRow][0]).toBe("T");
        expect(rowsValue[activeRow][1]).toBe("T");

        hookResult.current.currentPosition[1] = 1;

        fireEvent.keyDown(document.body, backspaceEvent);

        expect(hookResult.current.currentPosition[1]).toBe(0);
      });
    });

    describe("When it's an arrow", () => {
      const rightArrowClick = {
        key: "ArrowRight",
        code: "ArrowRight",
      };

      const leftArrowClick = {
        key: "ArrowLeft",
        code: "ArrowLeft",
      };

      it("If it's the right arrow it should move the active position one guess forward", () => {
        const activeGuess = hookResult.current.currentPosition[1];

        fireEvent.keyDown(document.body, rightArrowClick);

        expect(hookResult.current.currentPosition[1]).toBe(activeGuess + 1);
      });

      it("If it's the left arrow it should move the active position one guess backwards", () => {
        hookResult.current.currentPosition[1] = 2;
        const activeGuess = hookResult.current.currentPosition[1];

        fireEvent.keyDown(document.body, leftArrowClick);

        expect(hookResult.current.currentPosition[1]).toBe(activeGuess - 1);
      });
    });

    describe("When it's enter", () => {
      const enterEvent = {
        key: "Enter",
        code: "Enter",
      };

      it("Shouldn't do anything if the word is not complete", () => {
        fireEvent.keyDown(document.body, enterEvent);

        const activeRow = hookResult.current.currentPosition[0];

        expect(activeRow).toBe(0);
      });

      it("Should move the active row to the next if the word is filled", () => {
        let c = 0;
        while (c < 5) {
          fireEvent.keyDown(document.body, keyDownEvent);

          c++;
        }

        fireEvent.keyDown(document.body, enterEvent);

        const activeRow = hookResult.current.currentPosition[0];

        expect(activeRow).toBe(1);
      });

      it("Should hide the active row if it goes beyond the number of guesses", () => {
        let row = 0;

        while (row < 6) {
          let guess = 0;

          while (guess < 5) {
            fireEvent.keyDown(document.body, keyDownEvent);
            guess++;
          }

          fireEvent.keyDown(document.body, enterEvent);
          row++;
        }

        const activeRow = hookResult.current.currentPosition[0];

        expect(activeRow).toBe(-1);
      });

      it("Should accept the input even if it's with the numpad enter", () => {
        const numpadEnter = {
          key: "Enter",
          code: "NumpadEnter",
        };

        let c = 0;
        while (c < 5) {
          fireEvent.keyDown(document.body, keyDownEvent);

          c++;
        }

        fireEvent.keyDown(document.body, numpadEnter);

        const activeRow = hookResult.current.currentPosition[0];

        expect(activeRow).toBe(1);
      });
    });
  });
});
