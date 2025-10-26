import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
  const readStream = fs.createReadStream(filePath, 'utf-8');

  readStream.pipe(process.stdout);

  readStream.on('error', (err) => {
    throw new Error('Read operation failed');
  });
};

await read();
