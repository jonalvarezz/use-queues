const fs = require("fs");
const path = require("path");
const folder = "data";
const Queue = require("better-queue");

const NUMBEROFITEMS = 40_000;

const writeJSONAsync = (filePath, content) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(content), (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });

const processJob = ({ file, content }, cb) =>
  writeJSONAsync(file, content).then(cb);

const jobs = new Queue(processJob);

jobs.on("task_failed", (id) => {
  new Error(`Task ${id} failed.`);
  jobs.destroy();
});

jobs.on("drain", () => {
  console.log(`${NUMBEROFITEMS} files created.`);
});

Array.from({ length: NUMBEROFITEMS }).forEach((_, index) => {
  const file = path.join(folder, `dump-${index + 1}.json`);
  const content = {
    date: new Date().getTime(),
    random: Math.random(),
  };

  jobs.push({ file, content, id: index });
});
