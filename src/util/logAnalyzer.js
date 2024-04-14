const fs = require('fs');
module.exports = (logFiles) => {



    // Create an empty summary object to store the combined results
    const combinedSummary = {};

    // Loop through each log file
    logFiles.forEach((logFile) => {
        const logData = fs.readFileSync('./logs/' + logFile, 'utf8');
        const logLines = logData.split('\n');

        // Iterate through each log entry in the current log file
        logLines.forEach((line) => {
            try {
                const logEntry = JSON.parse(line) || line;
                const status = logEntry.Status;
                const time = logEntry.Time;
                const fileName = logEntry.FileName;

                // Check if the file exists in the combined summary object, if not, initialize it
                if (!combinedSummary[fileName]) {
                    combinedSummary[fileName] = { statusChanges: 1, statuses: [status], times: [time] ,name:logEntry['Name'] || undefined};
                } else {
                    // If the file already exists, increment the count and add the status to the statuses array
                    combinedSummary[fileName].statusChanges++;
                    combinedSummary[fileName].times.push(time);
                    combinedSummary[fileName].statuses.push(status);
                }
            } catch (error) {
                // console.error('Error parsing log entry:', error);
            }
        });
    });
    const summaryArray = Object.entries(combinedSummary)
    summaryArray.sort((a, b) => b[1].statusChanges - a[1].statusChanges)
    // Print the combined summary
    // console.log('Combined Summary of file-specific status changes:');
    for (const fileName in combinedSummary) {
        // console.log(`File: ${fileName}`);
        // console.log(`Status Changes: ${combinedSummary[fileName].statusChanges}`);
        // console.log(`Statuses: ${combinedSummary[fileName].statuses.join(', ')}`);
    }

    return summaryArray
}