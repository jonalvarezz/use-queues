const fs = require('fs');
const path = require('path');
const folder = 'data';

const NUMBEROFITEMS = 5_000;

const writeJSONAsync = (filePath, content) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(content), (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });

const promises = Array.from({ length: NUMBEROFITEMS }).map((_, index) => {
  const file = path.join(folder, `dump-${index + 1}.json`);
  const content = {
    date: new Date().getTime(),
    random: Math.random()
  };

  return writeJSONAsync(file, content);
});

Promise.all(promises).then(() =>
  console.log(`${NUMBEROFITEMS} files created.`)
);
