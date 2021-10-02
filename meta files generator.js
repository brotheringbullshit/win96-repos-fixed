const FS = require("fs");
const rootDir = process.argv[2];

if (!(FS.existsSync(rootDir)) || !(FS.statSync(rootDir).isDirectory())) throw new TypeError(`${rootDir} is not a directory`);

// make .meta files based on package.json entry
var packages = JSON.parse(FS.readFileSync(`./${rootDir}/Packages.json`));
packages.forEach(package => {
    var packagedir = package.packageRoot.replace("$REPO_PATH$", `./${rootDir}`);
    FS.writeFileSync(`${packagedir}/.meta`, JSON.stringify({ "description": package.description }));
    console.log(`Placed .meta file at "${packagedir}/.meta" with description: "${package.description}"\n`)
});