const convert = require("xml-js");
const fs = require("fs");
const verbose = require("../util/verbose");
var iconv = require("iconv-lite");
const calcDifference = require("../util/calcDifference");
const getParameterCaseInsensitive = require("../util/getParameterCaseInsensitive");

require("dotenv/config");

const dir = process.env.DIRECTORY || `//p05sr071/OperatorMonitor`;


const getFiles = () => {
  try {
    const files = fs.readdirSync(dir).filter((file) => {
      file = file.toLocaleLowerCase();
      return file.indexOf(".xml") !== -1;
    });

    const arr = [];

    files.forEach((file) => {
      const fileBody = fs.readFileSync(`${dir}/${file}`, "utf8");

      let convertedXML;
      try {
        convertedXML = convert.xml2js(fileBody, {
          compact: true,
          trim: true,
          normalize: true,
        });
      } catch (error) {
        // verbose(`convert file: ${file} - error : ${error}`);
        return;
      }

      const obj = { FileName: file };
      Object.entries(convertedXML.SHERUT).forEach((e) => {
        obj[e[0]] = e[1]._text || e[1][0]?._text || "";

      });

      // console.log(convertedXML?.SHERUT.map((e)=>{console.log(e)}))
      // Object.keys(convertedXML?.SHERUT).map((xmlTag)=>{console.log( || "")})
      
      
      Object.keys(convertedXML?.SHERUT).map((xmlTag)=>{
        if (convertedXML?.SHERUT[xmlTag].length){
          obj[xmlTag] = convertedXML.SHERUT[xmlTag].map(
            (obj) => obj._text
          ).join("\n");
        }
      })

      

      // if (convertedXML?.SHERUT?.StatusComment?.length) {
      //   obj["StatusComment"] = convertedXML.SHERUT.StatusComment.map(
      //     (obj) => obj._text
      //   ).join("\n");
      // }

      // if (convertedXML?.SHERUT?.Comment?.length) {
      //   obj["Comment"] = convertedXML.SHERUT.Comment.map(
      //     (obj) => obj._text
      //   ).join("\n");
      // }


      obj['StatusCode'] = convertedXML.SHERUT.StatusCode._text == 0 && (+getParameterCaseInsensitive(obj, "expminute")) ? +calcDifference(obj) >= (+getParameterCaseInsensitive(obj, "expminute")) ? 4 : convertedXML.SHERUT.StatusCode._text : convertedXML.SHERUT.StatusCode._text



      arr.push(obj);
    });

    return arr;
  } catch (error) {
    verbose(`get files error : ${error}`);
    return false;
  }
};


const getHistory = () => {
  try {
    const files = fs.readdirSync(dir + "/history").filter((file) => {
      file = file.toLocaleLowerCase();
      return file.indexOf(".xml") !== -1;
    });

    const arr = [];

    files.forEach((file) => {
      const fileBody = fs.readFileSync(`${dir}/history/${file}`, "utf8");

      let convertedXML;
      try {
        convertedXML = convert.xml2js(fileBody, {
          compact: true,
          trim: true,
          normalize: true,
        });
      } catch (error) {
        // verbose(`convert file: ${file} - error : ${error}`);
        return;
      }

      const obj = { FileName: file };
      Object.entries(convertedXML.SHERUT).forEach((e) => {
        obj[e[0]] = e[1]._text || e[1][0]?._text || "";

      });

      // if (convertedXML?.SHERUT?.StatusComment?.length) {
      //   obj["StatusComment"] = convertedXML.SHERUT.StatusComment.map(
      //     (obj) => obj._text
      //   ).join("\n");
      // }

      // if (convertedXML?.SHERUT?.Comment?.length) {
      //   obj["Comment"] = convertedXML.SHERUT.Comment.map(
      //     (obj) => obj._text
      //   ).join("\n");
      // }

      obj['StatusCode'] = convertedXML.SHERUT.StatusCode._text == 0 && (+getParameterCaseInsensitive(obj, "expminute")) ? +calcDifference(obj) >= (+getParameterCaseInsensitive(obj, "expminute")) ? 4 : convertedXML.SHERUT.StatusCode._text : convertedXML.SHERUT.StatusCode._text

      arr.push(obj);
    });

    return arr;
  } catch (error) {
    verbose(`get files error : ${error}`);
    return false;
  }
};


const deleteFile = (file) => {
  try {
    const filePath = `${dir}/${file}`;
    fs.unlinkSync(filePath);
    return true;
  } catch (error) {
    verbose("error deleting file : " + error);
    return false;
  }
};

const moveToHistory = (file) => {
  try {
    const filePath = `${dir}/${file}`;

    fs.renameSync(filePath, `${dir}/history/${file}`);
    return true;
  } catch (error) {
    verbose("error moving file : " + error);
    return false;
  }
};

const restoreFromHistory = (file) => {
  try {
    const filePath = `${dir}/${file}`;

    fs.renameSync(`${dir}/history/${file}`, filePath);
    return true;
  } catch (error) {
    verbose("error moving file : " + error);
    return false;
  }
};

const getTutorial = (file) => {
  try {

    const fileBody = fs.readFileSync(`${dir}/${file}`, "utf8");

    let convertedXML;
    try {
      convertedXML = convert.xml2js(fileBody, {
        compact: true,
        trim: true,
        normalize: true,
      });
    } catch (error) {
      // verbose(`convert file: ${file} - error : ${error}`);
      return;
    }

    //try under /info - fallback is full path - fallback is fileName.html under /info


    let tutorial

    if (getParameterCaseInsensitive(convertedXML.SHERUT, 'info')?._text) {
      try {

        if (fs.existsSync(`${dir}/info/${getParameterCaseInsensitive(convertedXML.SHERUT, 'info')?._text}`)) {
          return tutorial = fs.readFileSync(
            `${dir}/info/${getParameterCaseInsensitive(convertedXML.SHERUT, 'info')?._text}`
          );
        }


        if (fs.existsSync(`${getParameterCaseInsensitive(convertedXML.SHERUT, 'info')?._text}`
        )) {
          return tutorial = fs.readFileSync(
            `${getParameterCaseInsensitive(convertedXML.SHERUT, 'info')?._text}`
          );
        }

        if (fs.existsSync(`${dir}/info/${file.replace(/xml/gi, "html")}`
        )) {
          return tutorial = fs.readFileSync(
            `${dir}/info/${file.replace(/xml/gi, "html")}`
          );
        }

      } catch (error) {
        return false;
      }


    } else {
      try {
        tutorial = fs.readFileSync(
          `${dir}/info/${file.replace(/xml/gi, "html")}`
        );
      } catch (error) {
        return false;
      }

    }

    return iconv.decode(Buffer.from(tutorial), "win1255");
    // return iconv.decode(Buffer.from(tutorial), "win1255");
  } catch (error) {
    verbose("error getting tutorial : " + error);
    return false;
  }
};


const getAvailableLogs = () => {
  try {
    const files = fs.readdirSync('./logs/').filter((file) => {
      file = file.toLocaleLowerCase();
      return file.indexOf(".txt") !== -1;
    });

    // Initialize an object to store the filenames
    const fileObj = {};

    // Iterate through each filename
    files.forEach(filename => {
      // Extract year and month from the filename
      const [, year, month] = filename.split('-');

      // Convert year and month to integers
      const yearInt = parseInt(year, 10);
      const monthInt = parseInt(month, 10);

      // Create the year and month keys if they don't exist
      fileObj[yearInt] = fileObj[yearInt] || {};
      fileObj[yearInt][monthInt] = fileObj[yearInt][monthInt] || [];

      // Organize the filenames into the object
      fileObj[yearInt][monthInt].push(filename);
    });

    // Now fileObj contains the organized filenames
    return (fileObj);


  } catch (error) {
    verbose("error getting log files: " + error);
    return false;
  }
};


module.exports = { getFiles, deleteFile, getTutorial, moveToHistory, getHistory, restoreFromHistory, getAvailableLogs };
