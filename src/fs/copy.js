import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const copy = async () => {
  const srcFilePath = path.join(__dirname, 'files');
  const destFilePath = path.join(__dirname, 'files_copy');

  try {
    await fs.promises.stat(srcFilePath);
    await fs.promises.stat(destFilePath);
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw new Error('FS operation failed');
    }
  }

  try {
    await fs.promises.cp(srcFilePath, destFilePath, { recursive: true });
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await copy();
