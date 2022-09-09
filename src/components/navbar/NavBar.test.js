import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { HashRouter as Router } from "react-router-dom";
import NavBar from './NavBar'

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

test("color mode button is visible", () => {
    render(
        <Router>
            <NavBar />
        </Router>)
    const cmbtn = screen.getByTestId("colormode");
    expect(cmbtn).toBeVisible();
})

test("search button is visible", () => {
    render(
        <Router>
            <NavBar />
        </Router>
    )
    const searchbtn = screen.getByTestId("search");
    expect(searchbtn).toBeVisible();
})

test("game button is visible", () => {
    render(
        <Router>
            <NavBar />
        </Router>
    )
    const gamebtn = screen.getByTestId("game");
    expect(gamebtn).toBeVisible();
})