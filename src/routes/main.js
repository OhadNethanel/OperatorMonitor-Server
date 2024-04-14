const { validateRemoveFile } = require("../middlewares/validators");
const {
  getFilesModel,
  deleteFilesModel,
  getTutorialModel,
  getHistoryModel,
  restoreFilesModel,
  getFilesRefreshModel,
  getAvailableLogsModel,
  logAnalyzeModel,
} = require("../model/filesModel");
const router = require("express").Router();

router.get("/getFiles", getFilesModel);

router.get("/getFilesRefresh", getFilesRefreshModel);

router.get("/getHistory", getHistoryModel);

router.post("/removeFile", validateRemoveFile, deleteFilesModel);

router.post("/restoreFile", validateRemoveFile, restoreFilesModel);

router.post("/getTutorial", getTutorialModel);

router.get("/getAvailableLogs", getAvailableLogsModel);

router.post("/logAnalyze", logAnalyzeModel);

module.exports = router;
