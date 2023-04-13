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
// const writeToFile = (destPath, text) => {
//   // write to file
//   const content = text;

//   fs.writeFile(destPath, content, err => {
//     if (err) {
//       console.error(err);
//     }
//     // file written successfully
//     // note: 1 character is equal to 1 byte, so text.length gets the size in bytes
//     console.log(`Downloaded and saved ${text.length} bytes to ${destPath}`);
//   });
// };

// // Edge case 3: If the URL is invalid
// const isValidHttpUrl = string => {
//   let url;
//   try {
//     url = new URL(string);
//   } catch (_) {
//     return false;
//   }
//   return url.protocol === "http:" || url.protocol === "https:";
// };

// if (isValidHttpUrl(srcURL)) {
//   // read from URL
//   // request(srcURL, (error, response, body) => {
//   //   if (error) {
//   //     console.log("error:", error);
//   //     return;
//   //   }

//   //   // Edge case 1: check if file already exists
//   //   fs.stat(destPath, (err, stat) => {
//   //     if (err === null) {
//   //       // prompt user if they want to overwrite the file
//   //       const readline = require('readline');

//   //       const rl = readline.createInterface({
//   //         input: process.stdin,
//   //         output: process.stdout
//   //       });

//   //       rl.question(`File at ${destPath} found! Do you want to overwrite it? (type Y if so) `, (answer) => {
//   //         if (answer !== 'Y') {
//   //           rl.close();
//   //           return;
//   //         }
//   //         // Happy path in this callback waterfall
//   //         writeToFile(destPath, body);
//   //         rl.close();
//   //       });
//   //       return;
//   //     }
//   //     // Happy path - file does not exist so err.code === 'ENOENT' or something else

//   //     // Edge case 2: If the path is invalid (found from stackoverflow, but this doesn't seem to always work)
//   //     if (!(/^(\/?[a-z0-9]+)+$/.test(destPath))) {
//   //       console.log("Error: Invalid file path.");
//   //       return;
//   //     }
//   //     writeToFile(destPath, body);
//   //   });
//   // });
// }
// else {
//   console.log("Error: URL is Invalid");
// }