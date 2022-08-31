var fs = require('fs');
const os = require('os');

 
var dir = os.homedir() + '\\.config\\legendary\\metadata';

console.log('DIRECTORY TO MAKE = ', dir);
fs.mkdirSync(dir, {recursive: true});