const fs = require('fs')

// yarn install --ignore-optional unfortunately still throws an error with private packages so we must remove optionalDependency entries
// this is intended by the yarn team so this is the solution we must use https://github.com/yarnpkg/berry/issues/2425#issuecomment-770361283
const packageJsonString = fs.readFileSync('./package.json').toString()
const packageJson = JSON.parse(packageJsonString)
delete packageJson.optionalDependencies
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 4))
