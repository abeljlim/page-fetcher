// const { stdout } = require('process');
const request = require('request');
const args = process.argv.slice(2);

const srcURL = args[0];
const destPath = args[1];

const fs = require('fs');
// const { error } = require('console');

const downloader = function (sourceUrl, destPath) {
  request(sourceUrl, (error, response, body) => {
    if(error) {
      throw error;
    }
    
    // if destPath already exists
    fs.access(destPath, (error) => {
      if(error) {
        console.log(error);
        throw error;
      }
      console.log(`File exists`);
    });

    fs.writeFile(destPath, body, err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Downloaded ${body.length} bytes`);
    });
  })
}
downloader(srcURL, destPath);