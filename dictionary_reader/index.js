var ui = require('./ui');
var loader = require('./loader');
var dictionary = require('./dictionary');
//var searcher = require('./searcher');

ui.welcome();
// let butts = Promise.resolve(ui.selectDictionary());

// butts.then(result => { return dictionary.displayStats(result)});

ui.selectDictionary(dictionary.displayStats);

//ui.enterSearchTerm();


