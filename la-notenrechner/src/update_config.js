const fs = require("fs");

CONFIG_PATH = "src/app/shared/config/";
schularten = ["gym", "rs"];

// Function to get current filenames
// in directory
fs.readdir(CONFIG_PATH + "la-" + schularten[0], (err, files) => {
  if (err) console.log(err);
  else {
    console.log("\nCurrent directory filenames:");
    files.forEach((file) => {
      console.log(file);
    });
  }
});

console.log("hello world");
