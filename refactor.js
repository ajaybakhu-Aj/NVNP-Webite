const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend', 'src');

const replacementBlock = `const C = {
  bg: "var(--nv-bg, #11140c)",
  surface: "var(--nv-surface, #11140c)",
  surfCont: "var(--nv-surfCont, #1e2117)",
  surfHi: "var(--nv-surfHi, #282b21)",
  surfHighest: "var(--nv-surfHighest, #33362c)",
  surfLow: "var(--nv-surfLow, #0c0f07)",
  onSurf: "var(--nv-onSurf, #e2e4d5)",
  onSurfVar: "var(--nv-onSurfVar, #c3c9b3)",
  primary: "var(--nv-primary, #deffa4)",
  onPrimary: "var(--nv-onPrimary, #233600)",
  secondary: "var(--nv-secondary, #94da32)",
  outline: "var(--nv-outline, #8d937f)",
  outlineVar: "var(--nv-outlineVar, #434938)",
  sg: "'Space Grotesk', sans-serif",
  pp: "'Poppins', sans-serif",
};`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Regex to match the exact const C = { ... }; block
    // We make it flexible to match the exact block we have across the codebase
    const cRegex = /const\s+C\s*=\s*\{[\s\S]*?pp:\s*['"]'Poppins',\s*sans-serif['"],?\s*\n\};\n?/g;
    const fallbackRegex = /const\s+C\s*=\s*\{[\s\S]*?\n\};\n?/g;
    
    let regexToUse = cRegex;
    if (!cRegex.test(content)) {
        if (!fallbackRegex.test(content)) {
             return;
        }
        // Check if it's the right block (contains 'surface')
        const match = content.match(fallbackRegex);
        if (match && match[0] && match[0].includes('surface:')) {
            regexToUse = fallbackRegex;
        } else {
            return;
        }
    }

    console.log(`Processing: ${filePath}`);
    
    // Replace the block with the CSS variables block
    content = content.replace(regexToUse, replacementBlock + '\n');
    
    fs.writeFileSync(filePath, content, 'utf-8');
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            processFile(fullPath);
        }
    }
}

walkDir(srcDir);
console.log("Refactoring complete.");
