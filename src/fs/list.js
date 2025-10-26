import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
  const dirPath = path.join(__dirname, 'files');

  try {
    const files = await fs.promises.readdir(dirPath);
    console.log(files);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await list();
