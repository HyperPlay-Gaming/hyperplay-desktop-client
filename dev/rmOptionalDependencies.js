const fs = require('fs')

// yarn install --ignore-optional unfortunately still throws an error with private packages so we must remove optionalDependency entries
const packageJsonString = fs.readFileSync('./package.json').toString()
const packageJson = JSON.parse(packageJsonString)
delete packageJson.optionalDependencies
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 4))
