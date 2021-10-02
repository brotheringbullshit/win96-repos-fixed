const FS = require("fs");
const rootDir = process.argv[2];
var rofs = { "/": { "length": 0, "type": 1 } };

/**
 * Recursive function which adds every file and folder in every (sub)directory to var rofs
 * If this hite a recursion limit, you should be concerned about your folder structure
 * @param {FS.PathLike} currentDir
 */
function listDir(currentDir) {
    rofs[`/${currentDir}`] = { "length": 0, "type": 1 };
    var dirListing = FS.readdirSync(currentDir);
    dirListing.forEach((cFile) => {
        if ((FS.statSync(`${currentDir}/${cFile}`).isDirectory()) == true) {
            console.log(`${currentDir}/${cFile} is a directory`);
            listDir(`${currentDir}/${cFile}`);
        } else {
            console.log(`/${currentDir}/${cFile} is not a directory`);
            var fileLength = FS.statSync(`${currentDir}/${cFile}`).size;
            rofs[`/${currentDir}/${cFile}`] = { "length": fileLength, "type": 0 };
        }
    });
}

if (!(FS.existsSync(rootDir)) || !(FS.statSync(rootDir).isDirectory())) throw new TypeError(`${rootDir} is not a directory`);

// generate rofs.json
listDir(rootDir);
FS.writeFileSync("./rofs.json", JSON.stringify(rofs));