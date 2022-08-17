import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { HashRouter as Router } from "react-router-dom";
import NavBar from './NavBar'
test("color mode changes", () => {
    render(
        <Router>
            <NavBar />
        </Router>)
    const colormodebtn = screen.getByTestId('colormodebtn');
    fireEvent.dblClick(colormodebtn);
    expect(window.getComputedStyle(screen.getByTestId('navbg')).background).not.toBe('white');
})