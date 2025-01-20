/*
Passing messages from background script to popup
*/
let port;

function init(){
    port = chrome.runtime.connect({ name: 'trezor-connect' });
    port.onMessage.addListener(message => {
        window.postMessage(message, window.location.origin);
    });
    port.onDisconnect.addListener(d => {
        port = null;
    });
}

init();

navigator.serviceWorker.oncontrollerchange = () => {
  console.log(
    "This content script is now controlled by",
    navigator.serviceWorker.controller,
  );
  init();
};

/*
Passing messages from popup to background script
*/

window.addEventListener('message', event => {
    if (port && event.source === window && event.data) {
        port.postMessage({ data: event.data });
    }
});
