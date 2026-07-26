const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'styles', 'global.css');
let content = fs.readFileSync(file, 'utf-8');

const replacements = [
  { match: /background-color:\s*#(?:000000|000|1a1a1a|111|111111);/g, replace: 'background-color: var(--nv-bg, #11140c);' },
  { match: /background:\s*#(?:000000|000|1a1a1a|111|111111);/g, replace: 'background: var(--nv-bg, #11140c);' },
];

replacements.forEach(({ match, replace }) => {
  content = content.replace(match, replace);
});

fs.writeFileSync(file, content, 'utf-8');
console.log("global.css cleanup complete.");
