const start = async () => {
    await wait (10000);
    chrome.runtime.connect()
}

start()