import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = crypto.createHash('sha256');
  const readStream = fs.createReadStream(filePath);

  readStream.on('data', (chunk) => {
    hash.update(chunk);
  });

  readStream.on('end', () => {
    console.log(hash.digest('hex'));
  });

  readStream.on('error', (err) => {
    throw new Error('Hash calculation failed');
  });
};

await calculateHash();
