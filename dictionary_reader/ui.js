var loader = require('./loader');
var dictionary = require('./dictionary');

var ui = {
  welcome: () => {
    console.log("Welcome to the node dictionary reader!");
    console.log('======================================');
    console.log('Enter q to quit');
  },

  quit: () => {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', data => {
      data = data.trim();

      if (data === 'q') {
        process.exit();
      }
    })
  },

  listDictionaries: (dictionaries) => {
    // let dictionaries = loader.scanDir('./data');
    // console.log(dictionaries);

    console.log('Select a dictionary to load:');
    
    dictionaries.forEach( (dictionary, i) => {
      console.log(`${i + 1}. ${dictionary}`);
    });

    // Promise.resolve(loader.scanDir('./data'))
    // .then( result => {
    //   // result.forEach( (i, dictionary) => {
    //   //   console.log(`${i + 1}. ${dictionary}`);
    //   // });
    //   console.log(result);
    // })
    
    
  },

  selectDictionary: () => {
    let dictionaries = loader.scanDir('./data');
    ui.listDictionaries(dictionaries);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', data => {
      data = data.trim();

      if (data === 'q') {
        process.exit();
      } else if (data > 0 && data <= dictionaries.length) {
        dictionary.displayStats(dictionaries[data - 1]);
      } else {
        console.log('Invaid entry. Try again:');
      }
    })

  }

}

module.exports = ui;