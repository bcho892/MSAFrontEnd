import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import MovieRow from './MovieRow'

test("right button loads", () => {
    render(
        <MovieRow genre="" children="">
        </MovieRow>
    )
    const rightbtn = screen.getByTestId("rightbutton");
    expect(rightbtn).toBeVisible();
}
);

test("left button loads", () => {
    render(
        <MovieRow genre="" children=""></MovieRow>

    )
    const leftbtn = screen.getByTestId("leftbutton");
    expect(leftbtn).toBeVisible();
})
