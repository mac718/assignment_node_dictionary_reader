const fs = require('fs');
const saver = require('./saver');

var searcher = {
  displaySearchOptions: () => {
    console.log('What kind of search?');
    console.log('1. Exact match');
    console.log('2. Partial match');
    console.log('3. Begins with');
    console.log('4. Ends with');
  },

  exactMatch: (dictionary, searchTerm) => {
    process.stdin.removeAllListeners('data');

    fs.readFile(`./data/${dictionary}`, (err, data) => {
      data = JSON.parse(data);
      let entries = Object.keys(data);
      let match = entries.filter(entry => {
        return entry == searchTerm;
      })
      console.log(match);
      saver.savePrompt(match);
    })
  },

  partialMatch: (dictionary, searchTerm) => {
    process.stdin.removeAllListeners('data');

    fs.readFile(`./data/${dictionary}`, (err, data) => {
      data = JSON.parse(data);
      let entries = Object.keys(data);
      let match = entries.filter(entry => {
        return entry.includes(searchTerm);
      })
      console.log(match);
      saver.savePrompt(match);
    })
  },

  beginsWith: (dictionary, searchTerm) => {
    process.stdin.removeAllListeners('data');

    fs.readFile(`./data/${dictionary}`, (err, data) => {
      data = JSON.parse(data);
      let entries = Object.keys(data);
      let regex = new RegExp(`^${searchTerm}`);
      let match = entries.filter(entry => {
        return regex.exec(entry);
      })
      console.log(match);
      saver.savePrompt(match);
    })
  },

  endsWith: (dictionary, searchTerm) => {
    process.stdin.removeAllListeners('data');

    fs.readFile(`./data/${dictionary}`, (err, data) => {
      data = JSON.parse(data);
      let entries = Object.keys(data);
      let regex = new RegExp(`\\w*${searchTerm}\\b`);
      let match = entries.filter(entry => {
        return regex.exec(entry);
      })
      console.log(match);
      saver.savePrompt(match);
    })
  }
}

module.exports = searcher;