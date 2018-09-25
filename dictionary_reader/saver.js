const fs = require('fs');

var saver = {
  saveResults: (data, words) => {
    process.stdin.removeAllListeners('data');
    console.log('Specify path');
    process.stdin.on('data', data => {
      let path = data.trim();
      fs.writeFile(path, words, {flag: 'wx'}, (err, data) => {
        if (err) {
          console.log('File already exists. Overwrite?');
          process.stdin.removeAllListeners('data');
          process.stdin.on('data', data => {
            let answer = data.trim();
            if (answer == 'y') {
              fs.writeFile(path, words, (err, data) => {
                if (err) throw err;
                console.log('Results saved!');
                process.exit();
              });
            } else if (answer == 'n'){
              saver.saveResults(data, words);
            }
          })
        } else {
          console.log('Results saved!');
          process.exit();
        }
      });
    })
  },

  savePrompt: words => {
    console.log("Save results?");

    process.stdin.on('data', data => {
      data = data.trim();
      
      if (data == 'q' || data == 'n') {
        process.exit();
      } else if (data == 'y') {
        saver.saveResults(data, words);
        
      } else {
        console.log('Invalid entry; try again:')
      }
    });
  }
}

module.exports = saver;