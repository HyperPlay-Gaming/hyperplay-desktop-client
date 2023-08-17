import { app, ipcRenderer } from 'electron';
import axios from 'axios';
import { join } from 'path';
import { createWriteStream } from 'fs';

export async function downloadRdiffForCurrentOS(): Promise<string> {
  console.log('Selecting rdiff binary');
  const baseURL = 'https://gateway.valist.io/ipfs/QmaZpLTHU6k4BA6feiNDtGA34Sm9hYWtwcgrrhwGG5kvNL/';

  let binaryName: string;
  switch (process.platform) {
    case 'win32':
      binaryName = 'windows/amd64/rdiff.exe';
      break;
    case 'darwin':
      binaryName = 'darwin/amd64/rdiff';
      break;
    case 'linux':
      binaryName = 'linux/amd64/rdiff';
      break;
    default:
      throw new Error('Unsupported platform');
  }

  const downloadURL = `${baseURL}${binaryName}`;

  const configFolder = app.getPath('appData')
  const targetPath = join(configFolder, 'hyperplay', 'tools', 'rdiff');
  const writer = createWriteStream(targetPath);

  console.log(`Downloading rdiff from ${downloadURL}`);
  const response = await axios.get(downloadURL, {
    responseType: 'stream',
    validateStatus: function (status) {
      return status >= 200 && status < 300;
    }
  });

  if (response.status !== 200) {
    throw new Error(`Received HTTP ${response.status}: ${response.statusText}`);
  }

  // Pipe only if there's content
  if (response.headers['content-length'] !== '0') {
    response.data.pipe(writer);
  } else {
    throw new Error('No content received from the server.');
  }

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(targetPath));
    writer.on('error', reject);
  });
}

export const downloadRdiff = () =>
  ipcRenderer.send('downloadRdiff')

