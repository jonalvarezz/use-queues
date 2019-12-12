const fs = require("fs");
const path = require("path");
const folder = "data";

const allObjects = [];

const readFileAsync = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });

const files = fs.readdirSync(folder);
const promises = files.map(fileName =>
  readFileAsync(path.join(folder, fileName)).then(data => {
    const content = JSON.parse(data.toString());
    allObjects.push(content);
  })
);

Promise.all(promises).then(() =>
  console.log(`Finished. Total: ${allObjects.length}`)
);
