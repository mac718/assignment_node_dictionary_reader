const ui = require('./ui');
const loader = require('./loader');
const dictionary = require('./dictionary');

ui.welcome();

ui.selectDictionary(dictionary.displayStats);
