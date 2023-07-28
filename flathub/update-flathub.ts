import * as fs from 'fs'
import * as crypto from 'crypto'

console.log('tag name: ', process.env.RELEASE_VERSION)

// update url in xyz.hyperplay.HyperPlay.yml
console.log('updating url in xyz.hyperplay.HyperPlay.yml')
const ymlFilePath = './xyz.hyperplay.HyperPlay/xyz.hyperplay.HyperPlay.yml'
let hpYml = fs.readFileSync(ymlFilePath).toString()

const releaseString = `https://github.com/HyperPlay-Gaming/hyperplay-desktop-client/releases/download/${
  process.env.RELEASE_VERSION
}/hyperplay-${process.env.RELEASE_VERSION?.substring(1)}.tar.xz`
hpYml = hpYml.replace(
  /https:\/\/github.com\/HyperPlay-Gaming\/hyperplay-desktop-client\/releases\/download\/v.*..*..*\/hyperplay-.*..*..*.tar.xz/,
  releaseString
)

// update hash in xyz.hyperplay.HyperPlay.yml
console.log('updating hash in xyz.hyperplay.HyperPlay.yml')
const tarXzFilePath = fs
  .readdirSync('./dist')
  .find((fileName) => fileName.endsWith('.tar.xz'))
if (tarXzFilePath === undefined) {
  throw 'Tar XZ could not be found!'
}
const outputContent = fs.readFileSync('./dist/' + tarXzFilePath)
const hashSum = crypto.createHash('sha512')
hashSum.update(outputContent)
const sha512 = hashSum.digest('hex')

hpYml = hpYml.replace(/sha512: [0-9, a-f]{128}/, `sha512: ${sha512}`)

fs.writeFileSync(ymlFilePath, hpYml)

// update release version and date on xml tag in xyz.hyperplay.HyperPlay.metainfo.xml
console.log(
  'updating release version and date on xml tag in xyz.hyperplay.HyperPlay.metainfo.xml'
)
const xmlFilePath =
  './xyz.hyperplay.HyperPlay/xyz.hyperplay.HyperPlay.metainfo.xml'
let hpXml = fs.readFileSync(xmlFilePath).toString()
const date = new Date()
const isoDate = date.toISOString().slice(0, 10)

hpXml = hpXml.replace(
  /release version="v.*..*..*" date="[0-9]{4}-[0-9]{2}-[0-9]{2}"/,
  `release version="${process.env.RELEASE_VERSION}" date="${isoDate}"`
)

fs.writeFileSync(xmlFilePath, hpXml)
console.log(
  'Finished updating flathub release! Be sure to update release notes manually before merging.'
)
