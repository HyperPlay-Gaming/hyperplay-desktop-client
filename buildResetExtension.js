const { spawnSync } = require('child_process')
const { existsSync } = require('fs')
const { platform } = require('os')
const process = require('process')

const [nodeExe, scriptPath, ...args] = process.argv

const resetExtensionScript =
  './node_modules/@hyperplay/extension-importer/src/resetExtension.js'
if (existsSync(resetExtensionScript)) {
  console.log('spawning pkg', resetExtensionScript, args)
  const command = platform() === 'win32' ? 'yarn.cmd' : 'yarn'
  const result = spawnSync(
    command,
    [
      'pkg',
      resetExtensionScript,
      '--out-path',
      './public/extensions/resetExecutables',
      ...args
    ],
    { shell: true }
  )
  if (result.error) {
    console.error(result.error)
  } else {
    console.log('stdout: ', result.stdout.toString())
    console.error('stderr: ', result.stderr.toString())
  }
} else {
  console.warn('Reset extension script could not be found')
}
