const fs = require('fs')
const yaml = require('js-yaml')

const x64Content = fs.readFileSync('dist-x64/latest-mac-x64.yml', 'utf8')
const arm64Content = fs.readFileSync('dist-arm64/latest-mac-arm64.yml', 'utf8')

const x64Data = yaml.load(x64Content)
const arm64Data = yaml.load(arm64Content)

// Merge files field from both x64 and arm64
const mergedFiles = [...(x64Data.files || []), ...(arm64Data.files || [])]

// Combine other fields
const combinedData = {
  version: x64Data.version || '0.0.0',
  files: mergedFiles,
  path: x64Data.path || '',
  sha512: x64Data.sha512 || '',
  releaseDate: x64Data.releaseDate || ''
}

const resultYaml = yaml.dump(combinedData, { lineWidth: 120 })

fs.writeFileSync('latest-mac.yml', resultYaml, 'utf8')
