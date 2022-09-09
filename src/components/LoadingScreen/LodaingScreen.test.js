import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import LoadingScreen from './LoadingScreen'

test("visible on load", () => {
    render(
        <LoadingScreen />
    )
    const element = screen.getByTestId("container");
    expect(element).toBeVisible();
});

