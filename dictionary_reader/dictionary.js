//var ui = require('./ui');
const fs = require('fs');

var dictionary = {
  displayStats: (dictionary) => {
    let path = `./data/${dictionary}`;
    fs.readFile(path, (err, data) => {
      if (err) throw err;
      console.log('Sucessfully loaded dictionary.')
      data = JSON.parse(data);
      let words = Object.keys(data)
      let wordCount = words.length;
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
    })
  }
}

module.exports = dictionary;