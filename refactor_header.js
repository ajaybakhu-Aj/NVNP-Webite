const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'components', 'ui', 'Header.jsx');
let content = fs.readFileSync(file, 'utf-8');

const replacements = [
  { match: /"#94da32"/g, replace: '"var(--nv-secondary)"' },
  { match: /"#131313"/g, replace: '"var(--nv-onPrimaryContainer, #111)"' },
  { match: /"#c3c9b3"/g, replace: '"var(--nv-onSurfVar)"' },
  { match: /"rgba\(7,8,5,0\.92\)"/g, replace: '"var(--nv-bg)"' },
  { match: /"rgba\(255,255,255,0\.06\)"/g, replace: '"var(--nv-surfHi)"' },
  { match: /"rgba\(148,218,50,0\.3\)"/g, replace: '"var(--nv-outlineVar)"' },
  { match: /"#e2e4d5"/g, replace: '"var(--nv-onSurf)"' },
  { match: /"#8d937f"/g, replace: '"var(--nv-outline)"' },
  { match: /"#1e2117"/g, replace: '"var(--nv-surfCont)"' },
  { match: /"#434938"/g, replace: '"var(--nv-outlineVar)"' },
  { match: /"#282b21"/g, replace: '"var(--nv-surfHi)"' },
  { match: /"rgba\(148,218,50,0\.1\)"/g, replace: '"var(--nv-surfHi)"' },
  { match: /"rgba\(255,255,255,0\.05\)"/g, replace: '"var(--nv-surfHi)"' },
  { match: /"#deffa4"/g, replace: '"var(--nv-primary)"' }
];

replacements.forEach(({ match, replace }) => {
  content = content.replace(match, replace);
});

fs.writeFileSync(file, content, 'utf-8');
console.log("Header.jsx Refactoring complete.");
