import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const numCores = os.cpus().length;
  const workerPath = path.join(__dirname, 'worker.js');
  const results = [];
  const promises = [];

  for (let i = 0; i < numCores; i++) {
    const promise = new Promise((resolve) => {
      const worker = new Worker(workerPath);
      const dataToSend = 10 + i;

      worker.on('message', (result) => {
        resolve({ status: 'resolved', data: result });
        worker.terminate();
      });

      worker.on('error', (err) => {
        resolve({ status: 'error', data: null });
        worker.terminate();
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          resolve({ status: 'error', data: null });
        }
      });

      worker.postMessage(dataToSend);
    });

    promises.push(promise);
  }

  const allResults = await Promise.all(promises);
  console.log(allResults);
};

await performCalculations();
