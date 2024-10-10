// logger.js

let logInterval = setInterval(() => {
    console.log('Logging every second from logger.js');
  }, 1000);
  
// Optionally, handle clearing the interval if needed
self.addEventListener('message', (event) => {
if (event.data === 'stopLogging') {
    clearInterval(logInterval);
    console.log('Stopped logging.');
}
});
  