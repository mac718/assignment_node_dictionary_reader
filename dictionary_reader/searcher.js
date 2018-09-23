const fs = require('fs');

var searcher = {
  displaySearchOptions: () => {
    console.log('What kind of search?');
    console.log('1. Exact match');
    console.log('2. Partial match');
    console.log('3. Begins with');
    console.log('4. Ends with');
  },

  exactMatch: (dictionary, searchTerm) => {
    fs.readFile(`./data/${dictionary}`, (err, data) => {
      data = JSON.parse(data);
      let entries = Object.keys(data);
      let match = entries.filter(entry => {
        return entry == searchTerm;
      })
      console.log(match);
    })
  },

  partialMatch: (dictionary, searchTerm) => {
    fs.readFile(`./data/${dictionary}`, (err, data) => {
      data = JSON.parse(data);
      let entries = Object.keys(data);
      let match = entries.filter(entry => {
        return entry.includes(searchTerm);
      })
      console.log(match);
    })
  },

  beginsWith: (dictionary, searchTerm) => {
    fs.readFile(`./data/${dictionary}`, (err, data) => {
      data = JSON.parse(data);
      let entries = Object.keys(data);
      let regex = new RegExp(`^${searchTerm}`);
      let match = entries.filter(entry => {
        return regex.exec(entry);
      })
      console.log(match);
    })
  },

  endsWith: (dictionary, searchTerm) => {
    fs.readFile(`./data/${dictionary}`, (err, data) => {
      data = JSON.parse(data);
      let entries = Object.keys(data);
      let regex = new RegExp(`\\w*${searchTerm}\\b`);
      let match = entries.filter(entry => {
        return regex.exec(entry);
      })
      console.log(match);
    })
  }
}

module.exports = searcher;