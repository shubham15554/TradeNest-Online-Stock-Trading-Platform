import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "../landing_page/home/Hero";

describe("Hero component", () => {
  test("renders Hero image", () => {
    render(<Hero />);

    const heroImage = screen.getByAltText("Hero image");

    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute(
      "src",
      expect.stringContaining("homeHero.png")
    );
  });
});
