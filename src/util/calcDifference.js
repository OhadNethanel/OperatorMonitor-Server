const getParameterCaseInsensitive = require("./getParameterCaseInsensitive");

module.exports = (data) => {
    const date = getParameterCaseInsensitive(data, "enddate") || getParameterCaseInsensitive(data, "startdate") || getParameterCaseInsensitive(data, "curdate")
    const time = getParameterCaseInsensitive(data, "endtime") || getParameterCaseInsensitive(data, "starttime") || getParameterCaseInsensitive(data, "curtime")

    const dateSplit = date.replace(/[^0-9/]/g, "").split("/");
    const timeSplit = time.replace(/[^0-9:/]/g, "").split(":");
    const dt1 = new Date();
    const dt2 = new Date(
        +dateSplit[2],
        +dateSplit[1] - 1,
        +dateSplit[0],
        timeSplit[0],
        timeSplit[1],
        timeSplit[2]
    ); // Note: month is zero-based

    const diffMs = dt1 - dt2; // milliseconds between
    const diffMins = Math.floor(diffMs / 60000);

    return diffMins
};
