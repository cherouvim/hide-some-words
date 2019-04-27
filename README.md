# hide-some-words
[![npm version](https://img.shields.io/npm/v/hide-some-words.svg?color=0c0)](https://www.npmjs.com/package/hide-some-words)
[![travis](https://img.shields.io/travis/cherouvim/hide-some-words.svg?color=0c0)](https://travis-ci.org/cherouvim/hide-some-words)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?color=0c0)](http://makeapullrequest.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?color=0c0)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?color=0c0)](https://opensource.org/licenses/MIT)

Hides some words from a blob of text. For input `foo bar test example` it may return `foo bar ___ example`.

## Usage
```javascript
const hideSomeWords = require("./index.js");

const text = 
`Lorem ipsum dolor sit amet, consectetur adipiscing elit.Proin eget erat urna.
Donec vel dui vel felis efficitur posuere vitae nec massa. Nullam auctor
porttitor ligula, eget consequat sem hendrerit ac. Nam tristique aliquet sapien,
vel tincidunt urna mattis porttitor. Quisque ullamcorper eu lectus vitae luctus.`;

console.log(hideSomeWords(text));
```
consistently prints:
```
_____ ipsum dolor ___ amet, ___________ adipiscing ____.Proin ____ ____ urna.
Donec ___ dui vel felis efficitur posuere _____ nec _____. Nullam ______
_________ ______, eget consequat ___ _________ ac. ___ tristique _______ sapien,
vel _________ urna mattis porttitor. _______ ullamcorper eu lectus vitae luctus.
```

### Parameters
|Name|Type|Default|Description|
|---|---|---|---|
|text|string| |The input text|
|percentage|number|0.3|A percentage between 0.0 to 1.0 which determines the amount of (hideable) words to hide|
|character|string|_|The replacement character|
|skipLength|number|2|The length that a word needs to have in order to skip it|  

## License
[MIT](https://choosealicense.com/licenses/mit/)
