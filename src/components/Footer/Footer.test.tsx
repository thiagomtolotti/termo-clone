import { render } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer component", () => {
  it("Should render correctly", () => {
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });
});
