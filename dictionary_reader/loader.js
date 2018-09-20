var fs = require('fs');
//var ui = require('./ui');

var loader = {
  scanDir: (dir, callback) => {
    //let dictionaryArray = [];
    fs.readdir(dir, (err, data) => {
      if (err) throw err;
      callback(data);
      //console.log(data);
      //dictionaryArray.then(result => { ui.listDictionaries(result) });
    });
    //return dictionaryArray;
  }
}

module.exports = loader;