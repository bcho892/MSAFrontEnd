import { formatTime, extractProbability } from './Helper'
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
    expect(formatTime(60)).toBe("1 M ");
});

test("Extracts number regardless of property name", () => {
    let mockData = {adsjljds: "20"};
    expect(extractProbability(mockData)).toStrictEqual({name:"adsjljds", probability:"20.00"});
})

test("Works with scientific notation", () => {
    let mockData = {test: "2e-3"};
    expect(extractProbability(mockData)).toStrictEqual({name:"test", probability:"0.002000"});
})

test("Rounds properly", () => {
    let mockData = {test: "99999"};
    expect(extractProbability(mockData)).toStrictEqual({name:"test", probability:"1.000e+5"});
} )
