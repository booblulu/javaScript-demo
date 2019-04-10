const sum = require("../src/js/sum");

test("sum 1+5",()=>{
    expect(sum(1,5)).toBe(6);
});

test("fab 7+6",()=>{
    expect(sum(7,6)).toBe(13);
});