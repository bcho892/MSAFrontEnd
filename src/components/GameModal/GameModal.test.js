import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import GameModal from './GameModal'

test("visible when open", () => {
    render(<GameModal opened={true} closeHandler={() => { }} />);
    const testbtn = screen.getByTestId("closebtn");
    expect(testbtn).toBeTruthy();
})

test("close button closes", () => {
    let open = true;
    const closeHandle = () => { open = false };
    render(<GameModal opened={open} closeHandler={closeHandle} />);
    const testbtn = screen.getByTestId("closebtn");
    fireEvent.click(testbtn);
    expect(testbtn).not.toBeVisible();

})