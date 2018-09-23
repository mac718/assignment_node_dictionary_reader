//var ui = require('./ui');
const fs = require('fs');
//const searcher = require('./searcher');

var dictionary = {
  displayStats: (dictionary, callback) => {
    let path = `./data/${dictionary}`;
    let wordCount = 0;
    let wordsByFirstLetterCount = {};
    fs.readFile(path, (err, data) => {
      if (err) throw err;

      console.log('Sucessfully loaded dictionary.')

      data = JSON.parse(data);
      let words = Object.keys(data)
      wordCount = words.length;

      console.log(`Word count: ${wordCount}`);

      let wordsByFirstLetterCount = {};
      let alphaArr = 'abcdefghijklmnopqrstuvwxyz'.split('');

      alphaArr.forEach(letter => {
        let count = 0;
        words.forEach(word => {
          if (word[0].toLowerCase() == letter) {
            count += 1;
          }   
          wordsByFirstLetterCount[letter] = count;
        })
      })

      for (let letter in wordsByFirstLetterCount) {
        console.log(`${letter}: ${wordsByFirstLetterCount[letter]}`);
      }
      process.stdin.removeAllListeners('data');
     callback();
    })
  }
}

module.exports = dictionary;