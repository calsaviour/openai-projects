import Home from "../pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Chat GPT", () => {
    it("renders a home page", () => {
        const { container } = render(<Home />);
        // check if all components are rendered
        // expect(screen.getByTestId("num1")).toBeInTheDocument();
        // expect(screen.getByTestId("num2")).toBeInTheDocument();
        // expect(screen.getByTestId("add")).toBeInTheDocument();
        // expect(screen.getByTestId("subtract")).toBeInTheDocument();
        // expect(screen.getByTestId("multiply")).toBeInTheDocument();
        // expect(screen.getByTestId("divide")).toBeInTheDocument();
        expect(container.firstChild).toHaveClass('main');
        // const input = container.getByLabelText("Ask me anything")
        // expect(input).toHaveTextContent("Ask me anything")
    });
});