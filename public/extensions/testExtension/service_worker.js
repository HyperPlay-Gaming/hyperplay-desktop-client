// background.js

self.addEventListener('install', () => {
    console.log('Service Worker installed.');
});
  
self.addEventListener('activate', () => {
    console.log('Service Worker activated.');
  
    // Import the logger script
    importScripts('./logger.js');
});

// chrome.tabs.create({ url: "https://hyperplay.xyz", windowId: 3 })

chrome.runtime.onConnect.addListener((port)=> {
    console.log('chrome runtime connect called with port ', port)
})