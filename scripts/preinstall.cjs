const fs = require('fs');
const path = require('path');

function rmIfExists(p) {
  try {
    fs.rmSync(p, { force: true });
  } catch {
    // ignore
  }
}

const root = path.resolve(__dirname, '..');
rmIfExists(path.join(root, 'package-lock.json'));
rmIfExists(path.join(root, 'yarn.lock'));

const ua = process.env.npm_config_user_agent || '';
if (!ua.startsWith('pnpm/')) {
  console.error('Use pnpm instead');
  process.exit(1);
}
