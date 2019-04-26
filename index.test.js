const hideSomeWords = require("./index.js");

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae placerat tortor. a aa aaa aaaa.";
const roughWordBoundariesTester = /[\s\.\,]/;

describe("hideSomeWords", () => {
  it("works for corner case input", () => {
    expect(hideSomeWords("")).toEqual("");
  });
  it("consistently hides the same words", () => {
    expect(hideSomeWords(text)).toEqual(hideSomeWords(text));
    expect(hideSomeWords(text)).toEqual(hideSomeWords(text));
    expect(hideSomeWords(text)).toEqual(hideSomeWords(text));
    expect(hideSomeWords(text)).toEqual(hideSomeWords(text));
    expect(hideSomeWords(text)).toEqual(hideSomeWords(text));
  });
  it("doesn't change the text's length", () => {
    ["", "foo", "foo bar test", text, text + text, text + text + text].forEach(text => {
      expect(hideSomeWords(text).length).toEqual(text.length);
    });
  });
  it("doesn't change text if percentage is 0", () => {
    expect(hideSomeWords(text, 0, "_", 3)).toEqual(text);
  });
  it("doesn't change text if minLength is very high", () => {
    expect(hideSomeWords(text, 0.5, "_", 100)).toEqual(text);
  });
  describe("respects minLength", () => {
    it("3", () => {
      const processedWords = hideSomeWords(text, 0.9, "_", 3).split(roughWordBoundariesTester);
      expect(processedWords.includes("_")).toEqual(false);
      expect(processedWords.includes("__")).toEqual(false);
      expect(processedWords.includes("___")).toEqual(false);
    });
    it("5", () => {
      const processedWords = hideSomeWords(text, 0.9, "_", 5).split(roughWordBoundariesTester);
      expect(processedWords.includes("_")).toEqual(false);
      expect(processedWords.includes("__")).toEqual(false);
      expect(processedWords.includes("___")).toEqual(false);
      expect(processedWords.includes("____")).toEqual(false);
      expect(processedWords.includes("_____")).toEqual(false);
    });
  });
  it("hides some words but not all", () => {
    const processedWords = hideSomeWords(text, 0.5, "_", 3).split(roughWordBoundariesTester);
    const words = text.split(roughWordBoundariesTester);
    expect(processedWords.filter(word => word.startsWith("_")).length).toBeGreaterThan(0);
    expect(processedWords.filter(word => word.startsWith("_")).length).toBeLessThan(words.length);
  });
  it("hides all words", () => {
    expect(hideSomeWords("foo bar test", 1, "_", 1)).toEqual("___ ___ ____");
    expect(hideSomeWords("foo", 1, "_", 1)).toEqual("___");
  });
  it("uses specified replacement character", () => {
    expect(hideSomeWords("foo bar test", 1, "X", 1)).toEqual("XXX XXX XXXX");
    expect(hideSomeWords("foo", 1, "X", 1)).toEqual("XXX");
  });
});