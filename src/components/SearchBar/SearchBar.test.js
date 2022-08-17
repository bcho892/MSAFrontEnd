import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";

import { HashRouter as Router } from "react-router-dom";
import SearchBar from "./SearchBar"

test("empty search field", () => {
    render(
        <Router>
            <SearchBar opened={true} closeHandler={() => { }} />
        </Router>);

    const searchField = screen.getByTestId("searchfield");
    expect(searchField).toHaveDisplayValue("");

});

test("close button closes", () => {
    render(
        <Router>
            <SearchBar opened={true} closeHandler={() => { }} />
        </Router>
    )
    const closebtn = screen.getByTestId("closebtn");
    fireEvent.click(closebtn);
    expect(closebtn).not.toBeVisible();
})

test("search button closes", () => {
    render(
        <Router>
            <SearchBar opened={true} closeHandler={() => { }} />
        </Router>
    )
    const searchbtn = screen.getByTestId("searchbtn");
    fireEvent.click(searchbtn);
    expect(searchbtn).not.toBeVisible();
})


