import fs from 'fs'

export function deleteFolderRecursive(path: string) {
  try {
    console.log('deleting ', path)
    if (fs.existsSync(path)) {
      const stats = fs.statSync(path)

      if (stats.isDirectory()) {
        console.log('deleting existing path ', path)
        const paths = fs.readdirSync(path)
        for (const file of paths) {
          const curPath = path + '/' + file
          try {
            if (fs.lstatSync(curPath).isDirectory()) {
              // recurse
              deleteFolderRecursive(curPath)
            } else {
              // delete file
              fs.rmSync(curPath)
              console.log('deleting file ', curPath)
            }
          } catch (err) {
            console.log(`Error deleting file ${err} ${curPath}`)
          }
        }
        try {
          fs.rmdirSync(path)
        } catch (err) {
          console.log(`Error deleting folder ${err} ${path}`)
        }
      }
      // if the path passed is a file
      else if (stats.isFile()) {
        fs.rmSync(path, { force: true, maxRetries: 3, retryDelay: 100 })
        console.log('deleting file ', path)
      }
    }
  } catch (err) {
    console.error(`errorroeroeoeroeoror ${err}`)
  }
}
