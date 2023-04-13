const { stdout } = require('process');
const request = require('request');
const args = process.argv.slice(2);

const srcURL = args[0];
const destPath = args[1];

const fs = require('fs');

const writeToFile = (destPath, text) => {
  // write to file
  const content = text;

  fs.writeFile(destPath, content, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
    // note: 1 character is equal to 1 byte, so text.length gets the size in bytes
    console.log(`Downloaded and saved ${text.length} bytes to ${destPath}`);
  });
};

// read from URL
request(srcURL, (error, response, body) => {
  if (error) {
    console.log("error:", error);
    return;
  }

  // check if file already exists
  fs.stat(destPath, (err, stat) => {
    if(err === null) {
      // prompt user if they want to overwrite the file
      const readline = require('readline');

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question(`File at ${destPath} found! Do you want to overwrite it? (type Y if so) `, (answer) => {
        if (answer !== 'Y') {
          rl.close();
          return;
        }
        // Happy path in this callback waterfall
        writeToFile(destPath, body);
        rl.close();
      });
      return;
    }
    // Happy path
    writeToFile(destPath, body);
  });
});