"use strict";

/**
 * Seeded pseudo random number generator.
 * from: https://stackoverflow.com/a/47593316/72478
 */
function JSF(seed) {
  function jsf() {
    var e = s[0] - ((s[1] << 27) | (s[1] >> 5));
    s[0] = s[1] ^ ((s[2] << 17) | (s[2] >> 15));
    s[1] = s[2] + s[3];
    s[2] = s[3] + e;
    s[3] = s[0] + e;
    return (s[3] >>> 0) / 4294967295; // 2^32-1
  }
  seed >>>= 0;
  var s = [0xf1ea5eed, seed, seed, seed];
  for (var i = 0; i < 20; i++) jsf();
  return jsf;
}

const wordBoundaryCharacters = " \t\r\n~`!@#$%^&*()_+-=[]{}\\|;':\",./<>?".split("");

/**
 * Hides some words from the provided text.
 * For input "foo bar test example" it may return "foo bar ___ example".
 *
 * @param {string} [text] - The input text.
 * @param {number} [percentage=0.3] - A percentage between 0.0 to 1.0 which determines the amount
 *                 of (hideable) words to hide.
 * @param {string} [character=_] - The replacement character.
 * @param {number} [skipLength=2] - The character length up to which words will not be hidden.
 */
function hideSomeWords(text, percentage = 0.4, character = "_", skipLength = 2) {
  // skip early if necessary
  if (percentage <= 0) return text;
  // sanitize percentage
  if (percentage > 1) percentage = 1;

  // tokenize text
  const words = [];
  let lastWord = "";
  text.split("").forEach(char => {
    if (wordBoundaryCharacters.includes(char)) {
      if (lastWord.length) {
        words.push(lastWord);
        lastWord = "";
      }
      words.push(char);
    } else {
      lastWord += char;
    }
  });
  if (lastWord.length) {
    words.push(lastWord);
  }

  // collect hideable words
  const hideableWords = words.filter(word => word.length > skipLength);
  const hideableWordsLength = hideableWords.length;
  // skip early if necessary
  if (hideableWordsLength === 0) return text;

  // pseudo random number generator seeded with text length, in order to make consistent word hiding
  const nextRandom = JSF(text.length);

  // hide some words
  let hiddenWordsCount = 0;
  while (hiddenWordsCount / hideableWordsLength < percentage) {
    const wordToReplace = hideableWords[Math.floor(nextRandom() * hideableWords.length)];
    words[words.indexOf(wordToReplace)] = character.repeat(wordToReplace.length);
    hideableWords.splice(hideableWords.indexOf(wordToReplace), 1);
    hiddenWordsCount++;
  }

  return words.join("");
}

module.exports = hideSomeWords;
