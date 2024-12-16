const fs = require('fs')

const packageJsonString = fs.readFileSync('./package.json').toString()
const packageJson = JSON.parse(packageJsonString)
delete packageJson.optionalDependencies
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 4))
