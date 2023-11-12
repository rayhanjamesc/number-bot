// Import fs and path
const fs = require('fs');
const path = require('path');

// getAllFiles.js will export a function
module.exports = (directory, foldersOnly = false) => {
    // Store file names in an array
    let fileNames = [];

    // Use 'directory' argument to import any folders or files from specific directory
    const files = fs.readdirSync(directory, { withFileTypes: true});

    // Loop through 'files' to check if it's a file or a folder
    for (const file of files) {
        const filePath = path.join(directory, file.name);

        // Check for folders or files
        if (foldersOnly) {
            if (file.isDirectory()) {
                fileNames.push(filePath);
            }
        } else {
            if (file.isFile()) {
                fileNames.push(filePath);
            }
        }
    }

    // Return fileNames array
    return fileNames;
}