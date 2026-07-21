const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'frontend', 'src', 'styles', 'global.css');
let content = fs.readFileSync(cssFile, 'utf-8');

// Simple string replacements
const replacements = [
  { match: "#131313", varName: "var(--nv-bg, #131313)" },
  { match: "#11140c", varName: "var(--nv-surface, #11140c)" },
  { match: "#1b1b1b", varName: "var(--nv-surfCont, #1b1b1b)" },
  { match: "#1e2117", varName: "var(--nv-surfCont, #1e2117)" },
  { match: "#282b21", varName: "var(--nv-surfHi, #282b21)" },
  
  // Text colors
  { match: "#e5e2e1", varName: "var(--nv-onSurf, #e5e2e1)" },
  { match: "#e2e4d5", varName: "var(--nv-onSurf, #e2e4d5)" },
  { match: "#c3c9b3", varName: "var(--nv-onSurfVar, #c3c9b3)" },
  { match: "#8d937f", varName: "var(--nv-outline, #8d937f)" },
  { match: "#434938", varName: "var(--nv-outlineVar, #434938)" },
  { match: "#d0d0d0", varName: "var(--nv-onSurfVar, #d0d0d0)" },

  // Primary/Secondary colors
  { match: "#94da32", varName: "var(--nv-secondary, #94da32)" },
  { match: "#b5e75d", varName: "var(--nv-primary, #b5e75d)" },
];

for (const { match, varName } of replacements) {
    // 1. First replace all instances (case insensitive)
    const regex = new RegExp(match, 'gi');
    content = content.replace(regex, varName);
    
    // 2. Fix double wrapping: var(--nv-bg, var(--nv-bg, #131313)) -> var(--nv-bg, #131313)
    const doubleVarMatch = varName.replace(match, varName);
    content = content.split(doubleVarMatch).join(varName);
}

// Fix the `:root` definitions that we accidentally broke!
// e.g. `--nv-bg: var(--nv-surface, #11140c);`
content = content.replace(/--nv-surface:\s*var\(--nv-surface,\s*#11140c\);/g, '--nv-surface: #11140c;');
content = content.replace(/--nv-bg:\s*var\(--nv-surface,\s*#11140c\);/g, '--nv-bg: #11140c;');
content = content.replace(/--nv-onSurf:\s*var\(--nv-onSurf,\s*#e2e4d5\);/g, '--nv-onSurf: #e2e4d5;');
content = content.replace(/--nv-onSurfVar:\s*var\(--nv-onSurfVar,\s*#c3c9b3\);/g, '--nv-onSurfVar: #c3c9b3;');
content = content.replace(/--nv-secondary:\s*var\(--nv-secondary,\s*#94da32\);/g, '--nv-secondary: #94da32;');
content = content.replace(/--nv-primary:\s*var\(--nv-primary,\s*#b5e75d\);/g, '--nv-primary: #b5e75d;');
content = content.replace(/--nv-outline:\s*var\(--nv-outline,\s*#8d937f\);/g, '--nv-outline: #8d937f;');
content = content.replace(/--nv-outlineVar:\s*var\(--nv-outlineVar,\s*#434938\);/g, '--nv-outlineVar: #434938;');


fs.writeFileSync(cssFile, content, 'utf-8');
console.log("CSS Refactoring complete.");
