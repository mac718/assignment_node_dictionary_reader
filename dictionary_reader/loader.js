const fs = require('fs');

var loader = {
  scanDir: (dir, callback) => {
    fs.readdir(dir, (err, data) => {
      if (err) throw err;
      callback(data);
    });
  }
}

module.exports = loader;