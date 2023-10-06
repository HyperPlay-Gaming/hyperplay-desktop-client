import { ipcRenderer } from 'electron';

export const downloadIPDT = () =>
  ipcRenderer.send('downloadIPDT');

export const applyPatch = () =>
  ipcRenderer.send('applyPatch');
