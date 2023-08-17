import { exec } from 'child_process';
import { getBasePath } from './rdiffPaths';
import path, { join } from 'path';

export function getRdiffPathForCurrentOS(): string {
  const baseRdiffPath = getBasePath();
  switch (process.platform) {
    case 'win32':
      return join(baseRdiffPath, 'rdiff.exe');
    case 'darwin':
      return join(baseRdiffPath, 'rdiff');
    case 'linux':
      return join(baseRdiffPath, 'rdiff');
    default:
      throw new Error('Unsupported platform');
  }
}

export async function executeRdiffCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const rdiffPath = escapePathForBash(getRdiffPathForCurrentOS());
    exec(`${rdiffPath} ${command}`, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr)
        reject(`Error executing rdiff: ${error.message}`);
        return;
      }
      resolve(stdout);
    });
  });
}

export function escapePathForBash(path: string): string {
  return path.replace(/ /g, '\\ ');
}

export async function applyRdiffPatch(baseFile: string, deltaFile: string, newFile: string): Promise<string> {
  console.log('Applying patch')
  console.log({ baseFile, deltaFile, newFile })
  const baseRdiffPath = getBasePath()
  const baseFilePath = escapePathForBash(path.join(baseRdiffPath, baseFile))
  const deltaFilePath = escapePathForBash(path.join(baseRdiffPath, deltaFile))
  const newFilePath = escapePathForBash(path.join(baseRdiffPath, 'game.zip'))
  return executeRdiffCommand(`patch ${baseFilePath} ${deltaFilePath} ${newFilePath}`)
}