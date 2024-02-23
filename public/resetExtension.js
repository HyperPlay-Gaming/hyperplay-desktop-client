const process = require('process');
const fs = require('fs')

log('hello reset extension');
log(JSON.stringify(process.argv));

/**
 * Appends given message to the current log file
 * @param message message to append
 */
function appendMessageToLogFile(message) {
    fs.appendFileSync('./testFile.txt', `${message}\n`)
}

function log(text){
    appendMessageToLogFile(text)
}


function deleteFolderRecursive(path) {
    log('deleting ', path)
    if (fs.existsSync(path)) {
      fs.stat(path, (err, stats)=>{
        if(stats.isDirectory()){
          log('deleting existing path ', path)
          fs.readdirSync(path).forEach(function (file) {
            const curPath = path + '/' + file
            try {
              if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                deleteFolderRecursive(curPath)
              } else {
                // delete file
                fs.rmSync(curPath)
                log('deleting file ', curPath)
              }
            } catch (err) {
                log(`Error deleting file ${err} ${curPath}`)
            }
          })
          try {
            fs.rmdirSync(path)
          } catch (err) {
            log(`Error deleting folder ${err} ${path}`)
          }
        }
        // if the path passed is a file
        else if (stats.isFile){
          fs.rmSync(path)
          log('deleting file ', path)
        }
      })
    }
}

function rmFolders() {
    log('removing folders')
    const appConfigFolders = [
        process.argv[2],
        process.argv[3],
        process.argv[4]
    ]
    appConfigFolders.forEach((folder) => {
      try {
        deleteFolderRecursive(folder)
      } catch (e) {
        log(`Error while removing ${folder} ${e}`)
      }
    })
}

log('setting timeout')
setTimeout(rmFolders.bind(this), 1000)