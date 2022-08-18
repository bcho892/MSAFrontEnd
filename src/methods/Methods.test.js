import { formatTime } from './Helper'
test("Coverts no hour time", () => {
    expect(formatTime(2000)).toBe("33 M 20 S");
});

test("Converts one hour", () => {
    expect(formatTime(3600)).toBe("1 H ")
});

test("Converts 1 second", () => {
    expect(formatTime(1)).toBe("1 S");
});

test("Converts one minute", () => {
    expect(formatTime(60)).toBe("1 M ")
})
