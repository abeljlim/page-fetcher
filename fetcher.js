const request = require('request');
const args = process.argv.slice(2);

const srcURL = args[0];
const destPath = args[1];

// read from URL
request(srcURL, (error, response, body) => {
  if (error) {
    console.log("error:", error);
    return;
  }
  
  // write to file

  const fs = require('fs');

  const content = body;

  fs.writeFile(destPath, content, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
});