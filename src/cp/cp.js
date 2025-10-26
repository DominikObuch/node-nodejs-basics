import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
  const scriptPath = path.join(__dirname, 'files', 'script.js');

  const childProcess = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit']
  });

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);

  childProcess.on('error', (err) => {
    console.error('Child process error:', err);
  });

  childProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Child process exited with code ${code}`);
    }
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2', 'arg3']);
