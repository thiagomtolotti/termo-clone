import { render } from "@testing-library/react";
import { Header } from "./Header";

describe("Component Header", () => {
  it("Should render correctly", () => {
    const renderResult = render(<Header />);

    expect(renderResult.container).toMatchSnapshot();
  });
});
