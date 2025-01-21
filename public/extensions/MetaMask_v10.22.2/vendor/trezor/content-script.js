/*
Passing messages from background script to popup
*/

console.log(
    'app/vendor/trezor/content-script.js chrome.runtime.connect called at ',
    Date.now(),
    ' name trezor-connect ',
);
let port = chrome.runtime.connect({ name: 'trezor-connect' });
port.onMessage.addListener(message => {
    window.postMessage(message, window.location.origin);
});
port.onDisconnect.addListener(d => {
    console.log('trezor-connect disconnect called');
    port = null;
});

/*
Passing messages from popup to background script
*/

window.addEventListener('message', event => {
    if (port && event.source === window && event.data) {
        port.postMessage({ data: event.data });
    }
});
