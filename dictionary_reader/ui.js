var loader = require('./loader');
//var dictionary = require('./dictionary');
var searcher = require('./searcher');
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

  selectDictionary: (callback) => {
    
    let selection;
    let dictionaries = [];
    loader.scanDir('./data', (data) => {
      dictionaries = data.filter(file => {return file.match(/.json/)});
      ui.listDictionaries(dictionaries);
    });
    // loader.scanDir('./data').then(result => {
    //   result = result.filter(file => {return file.match(/.json/)});
    //   dictionaries = result;
    //   ui.listDictionaries(dictionaries);
    //   console.log(result);
    // } );
    //console.log(dictionaries);
    //ui.listDictionaries(dictionaries);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    return process.stdin.on('data', data => {
      data = data.trim();
      

      if (data === 'q') {
        process.exit();
      } else if (data > 0 && data <= dictionaries.length) {
        selection = data;
        //dictionary.displayStats(dictionaries[selection - 1]);

        callback(dictionaries[selection - 1], ui.selectSearchType);
        
        //process.exit();
      } else {
        console.log('Invaid entry. Try again:');
      }
    });
    //process.stdin.pause();
    //return selection;//dictionaries[selection - 1];
  },

  selectSearchType: () => {
    
    //process.stdin.pause();
    let selection;
    
    //process.stdin.resume();
    //process.stdin.setEncoding('utf8');
    
    //ui.enterSearchTerm;
    searcher.displaySearchOptions();
    process.stdin.on('data', (data) => {
      data = data.trim();


      if (data < 1 || data > 4) {
        console.log('Invalid selection; try again:');
      } else {
        selection = data;

        
        

        if (selection == 1) {
    

          ui.enterSearchTerm();
          
        }
      }
    })
    //return selection;
  },


  enterSearchTerm: () => {
    //let term = '';

    
    
    //process.stdin.resume();
    //process.stdin.setEncoding('utf8');
    process.stdin.on('data', data => {
      console.log('hello');
      data = data.trim();
      term = data;
      //console.log(term);
      
      searcher.exactMatch(term);
      //process.exit();
    });
    //process.stdin.pause()
  }


}

module.exports = ui;