import { render, screen } from "@testing-library/react";
import Layout from "@/components/Layout";
import "@testing-library/jest-dom";
 
describe("Layout Component", () => {
  it("renders a navigation link to the dashboard", () => {
    render(<Layout />);

    const link = screen.getByTestId("test-nav-link");

    expect(link).toBeInTheDocument();

    expect(link).toHaveAttribute("href", "/dashboard");
  });
});