const { spawnSync } = require("child_process");
const { existsSync } = require("fs");
const process = require('process')

const [nodeExe, scriptPath, ...args] = process.argv

const resetExtensionScript = './node_modules/@hyperplay/extension-importer/src/resetExtension.js'
if (existsSync(resetExtensionScript)){
    spawnSync('pkg', [resetExtensionScript, '--out-path', './public/extensions/resetExecutables', ...args])
}
else {
    console.warn('Reset extension script could not be found')
}
