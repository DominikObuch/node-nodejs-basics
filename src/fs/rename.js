import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const oldPath = path.join(__dirname, 'files', 'wrongFilename.txt');
  const newPath = path.join(__dirname, 'files', 'properFilename.md');

  try {
    await fs.promises.access(oldPath);
  } catch (err) {
    throw new Error('FS operation failed');
  }

  try {
    await fs.promises.access(newPath);
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.message === 'FS operation failed') {
      throw err;
    }
  }

  try {
    await fs.promises.rename(oldPath, newPath);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await rename();
