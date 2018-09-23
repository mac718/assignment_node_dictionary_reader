const loader = require('./loader');
const searcher = require('./searcher');

var ui = {
  welcome: () => {
    console.log("Welcome to the node dictionary reader!");
    console.log('======================================');
    console.log('Enter q to quit');
  },

  listDictionaries: (dictionaries) => {
    
    console.log('Select a dictionary to load:');
    
    dictionaries.forEach( (dictionary, i) => {
      console.log(`${i + 1}. ${dictionary}`);
    });
  },

  selectDictionary: (callback) => {
    
    let selection;
    let dictionaries = [];
    loader.scanDir('./data', (data) => {
      dictionaries = data.filter(file => {return file.match(/.json/)});
      ui.listDictionaries(dictionaries);
    });
    
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    return process.stdin.on('data', data => {
      data = data.trim();
      

      if (data === 'q') {
        process.exit();
      } else if (data > 0 && data <= dictionaries.length) {
        selection = data;

        callback(dictionaries[selection - 1], ui.selectSearchType);
        
      } else {
        console.log('Invaid entry. Try again:');
      }
    });
  },

  selectSearchType: (dictionary) => {
    
    let selection;
    
    searcher.displaySearchOptions();
    process.stdin.on('data', (data) => {
      data = data.trim();

      if (data == 'q') {
        process.exit();
      } else if (data < 1 || data > 4) {
        console.log('Invalid selection; try again:');
      } else {
        selection = data;
        process.stdin.removeAllListeners('data');
        ui.enterSearchTerm(selection, dictionary);
      }
    })
  },


  enterSearchTerm: (searchType, dictionary) => {

    console.log('Enter search term: ');
    
    process.stdin.on('data', data => {
      data = data.trim();
      term = data;
      
      if (term == 'q') {
        process.exit();
      } else if (searchType == 1) {
        searcher.exactMatch(dictionary, term);
      } else if (searchType == 2) {
        searcher.partialMatch(dictionary, term);
      } else if (searchType == 3) {
        searcher.beginsWith(dictionary, term);
      } else if (searchType == 4) {
        searcher.endsWith(dictionary, term);
      } else {
        console.log('Invalid entry; try again:')
      }
    });
  }
}

module.exports = ui;