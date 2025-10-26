import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const inputPath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const outputPath = path.join(__dirname, 'files', 'archive.gz');

  const readStream = fs.createReadStream(inputPath);
  const writeStream = fs.createWriteStream(outputPath);
  const gzip = zlib.createGzip();

  try {
    await pipeline(readStream, gzip, writeStream);
  } catch (err) {
    throw new Error('Compression failed');
  }
};

await compress();
