import { render, screen } from '@testing-library/react'
import { HashRouter as Router } from 'react-router-dom'
import "@testing-library/jest-dom/extend-expect";

import SearchResult from './SearchResult'
const mockInfo = { title: "test", year: "2020", rating: "9", id: "" }

test("Has correct title", () => {
    render(<Router>
        <SearchResult title={mockInfo.title} year={mockInfo.year} rating={mockInfo.rating} id={mockInfo.id} />
    </Router>)
    expect(screen.getByTestId("title")).toHaveTextContent("test");
});

test("Has correct rating", () => {
    render(<Router>
        <SearchResult title={mockInfo.title} year={mockInfo.year} rating={mockInfo.rating} id={mockInfo.id} />
    </Router>)
    expect(screen.getByTestId("rating")).toHaveTextContent("9");
})