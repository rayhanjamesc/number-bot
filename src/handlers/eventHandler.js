// Import path library
const path = require('path');

// This file will handle all events inside events folder

const getAllFiles = require("../utils/getAllFiles");

// eventHandler.js will export a function
module.exports = (client) => {
    // Variable to store a list of all the folders inside 'events' folder
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

    // Loop through all folders
    for (const eventFolder of eventFolders) {
        // Get all the files inside of 'events' folder
        const eventFiles = getAllFiles(eventFolder);

        // Get name of event based on the folder name
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop(); //Regex is to replace backslashes with forward slashes

        // Add event listener that passes in all event files
        client.on
    }
};