var fs = require('fs');
//var ui = require('./ui');

var loader = {
  scanDir: (dir) => {
    //let dictionaryArray = [];
    return fs.readdirSync(dir, (err, data) => {
      if (err) throw err;
      //console.log(data);
      //dictionaryArray.then(result => { ui.listDictionaries(result) });
    }).filter(file => {return file.match(/.json/)});
    //return dictionaryArray;
  }
}

module.exports = loader;