const express = require("express");
const app = express();
const { getFiles } = require("./src/api/database");
const Storage = require("node-storage");
const store = new Storage("./store");
const getCurrentTimeStamp = require("./src/util/getCurrentTimeStamp");
const logger = require("./src/util/logger");
const chokidar = require("chokidar");

require("dotenv/config");

const port = 3001;

const serverRunningMessage = `server is running <Port: ${port}>`;

app.use(express.json({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

const Router = require("./src/routes/main");

app.use("/", Router);

const userRouter = require("./src/routes/user");
app.use("/user", userRouter);

app.get("/", function (req, res) {
  res.status(200).send({ status: "server is running" });
});

app.post("/", (req, res) => {
  res.status(200).send({ status: "server is running" });
});

app.listen(port);

console.log(serverRunningMessage);

const getNewBadScheds = (newData) => {
  const oldData = store.get("data");
  if (!oldData) return;

  const filteredOldData = oldData.filter((item) => item.StatusCode === "0");

  const filteredNewData = newData.filter((newItem) =>
    filteredOldData.some((oldItem) => oldItem.FileName === newItem.FileName)
  );

  // Create an array to store the items with different StatusCodes
  const differentStatusItems = [];

  // Iterate through both arrays and compare StatusCodes
  for (let i = 0; i < filteredOldData.length; i++) {
    const oldItem = filteredOldData[i];
    const newItem = filteredNewData[i];

    if (oldItem.StatusCode !== newItem?.StatusCode) {
      differentStatusItems.push({
        FileName: oldItem.FileName,
        Name: oldItem.Name,
        Status: newItem?.StatusCode,
        Time: getCurrentTimeStamp(),
      });
    }
  }


  //get new files in directory
  const newFilesInThisIteration = newData.filter(
    (item1) => !oldData.some((item2) => item1.FileName === item2.FileName)
  );

  //filter which are not status 0
  const filteredNewFiles = newFilesInThisIteration.filter(
    (item) => item.StatusCode != 0
  );

  if (filteredNewFiles[0]) {
    filteredNewFiles.map((e) => {
      differentStatusItems.push({
        FileName: e.FileName,
        Name: e.Name,
        Status: e?.StatusCode,
        Time: getCurrentTimeStamp(),
      });
    });
  }

  if (differentStatusItems[0]) {
    //append to daily log
    logger(differentStatusItems);
  }
};

const loadFilesIntoStorage = () => {
  const schedArray = getFiles();
  if (schedArray) {
    getNewBadScheds(schedArray);
    store.put("data", schedArray);
  }
};

loadFilesIntoStorage();

//folder watcher

//chokidar.watch(process.env?.DIRECTORY,{ignoreInitial:true}).on("all", (event, path) => {
// console.log(event, path);
//  loadFilesIntoStorage();
// });



//timer
setInterval(() => {
  loadFilesIntoStorage();
}, process.env?.REFRESH_EVERY || 5000);
