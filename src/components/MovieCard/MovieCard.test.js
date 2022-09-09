import { fireEvent, render, screen } from '@testing-library/react'
import { HashRouter as Router } from 'react-router-dom'
import "@testing-library/jest-dom/extend-expect";
import MovieCard from './MovieCard'
window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};

test("Card loads", () => {
    render(
        <Router>
            <MovieCard id="11" title="test" imgurl="" year="2022" />
        </Router>
    )
    const element = screen.getByTestId("container");
    expect(element).toBeInTheDocument();
})

test("Clicking redirects", () => {
    render(
        <Router>
            <MovieCard id="11" title="test" imgurl="" year="2022" />
        </Router>
    )
    const element = screen.getByTestId("container");
    fireEvent.click(element);
    expect(element).not.toBeVisible();

})