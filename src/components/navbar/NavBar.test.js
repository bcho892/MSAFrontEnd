import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { HashRouter as Router } from "react-router-dom";
import NavBar from './NavBar'
test("default color mode", () => {
    render(
        <Router>
            <NavBar />
        </Router>)
    expect(window.getComputedStyle(screen.getByTestId('navbg')).background).toBe('white');
})

