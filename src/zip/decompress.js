import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const inputPath = path.join(__dirname, 'files', 'archive.gz');
  const outputPath = path.join(__dirname, 'files', 'fileToCompress.txt');

  const readStream = fs.createReadStream(inputPath);
  const writeStream = fs.createWriteStream(outputPath);
  const gunzip = zlib.createGunzip();

  try {
    await pipeline(readStream, gunzip, writeStream);
  } catch (err) {
    throw new Error('Decompression failed');
  }
};

await decompress();
