const fs = require("fs");

CONFIG_PATH = "src/assets/config/";
DATA_FILE_PATH = CONFIG_PATH + "config_data.json";
schularten = ["gym", "rs"];

function read_dir(path) {
  arr = [];

  files = fs.readdirSync(path);

  for (file of files) {
    if (file.indexOf("vorlage") == -1) {
      arr.push(file);
      // console.log(file);
    }
  }
  return arr;
}

configs = {};
// sort existng configs into arrays
for (schulart of schularten) {
  configs[schulart] = read_dir(CONFIG_PATH + "la-" + schulart);
}

console.log(configs);

// save object to data.json
fs.writeFile(DATA_FILE_PATH, JSON.stringify(configs), function (err) {
  if (err) {
    console.log(err);
  }
});
