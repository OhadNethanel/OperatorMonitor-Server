const { getFiles, deleteFile, getTutorial, moveToHistory, getHistory, restoreFromHistory, getAvailableLogs } = require("../api/database");
const Storage = require("node-storage");
const logAnalyzer = require("../util/logAnalyzer");

const getFilesModel = (req, res) => {
  // const schedArray = getFiles(); //parse files for each request

  const store = new Storage("./store");
  const schedArray = store.get("data") //deliver from store
  if (!schedArray) {
    return res.status(400).send("Error getting files");
  }
  return res.status(200).send(schedArray);
};

const getFilesRefreshModel = (req, res) => {
  const schedArray = getFiles(); //parse files

  if (!schedArray) {
    return res.status(400).send("Error getting files");
  }

  new Storage("./store").put("data", schedArray); //update store
  return res.status(200).send(schedArray);
};

const getHistoryModel = (req, res) => {
  const schedArray = getHistory();


  if (!schedArray) {
    return res.status(400).send("Error getting history");
  }
  return res.status(200).send(schedArray);
};

const deleteFilesModel = (req, res) => {
  const file = req.body.file;
  // if (deleteFile(file)) {
  if (moveToHistory(file)) {
    res.status(200).send("OK");
  } else {
    res.status(400).send("No file deleted");
  }
};

const restoreFilesModel = (req, res) => {
  const file = req.body.file;
  if (restoreFromHistory(file)) {
    res.status(200).send("OK");
  } else {
    res.status(400).send("No file restored");
  }
};

const getTutorialModel = (req, res) => {
  const file = req.body.file;

  const tutorial = getTutorial(file);

  if (tutorial) return res.status(200).send(tutorial);

  return res.status(404).send("No file detected");
};

const getAvailableLogsModel = (req, res) => {

  const logs = getAvailableLogs();
  if (logs) return res.status(200).send(logs);

  return res.status(404).send("Cannot serve logs");
};

const logAnalyzeModel = (req, res) => {
  const logs = logAnalyzer([req.body.files]);
  if (logs) return res.status(200).send(logs);

  return res.status(404).send("Cannot analyze log(s)");
};

module.exports = { getFilesModel, getFilesRefreshModel, deleteFilesModel, getTutorialModel, getHistoryModel, restoreFilesModel, getAvailableLogsModel, logAnalyzeModel };
