import os
import re

search_dir = 'd:/Nightvision/website/frontend/src'

for root, _, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            lines = content.split('\n')
            modified = False
            for i, line in enumerate(lines):
                if re.search(r'<h[1-6]', line) or re.search(r'className=.*auth-title', line) or re.search(r'className=.*dashboard-title', line):
                    if 'color: "#fff"' in line or 'color: "#ffffff"' in line or "color: '#fff'" in line or "color: '#ffffff'" in line:
                        line = line.replace('color: "#fff"', 'color: "var(--nv-onSurf)"')
                        line = line.replace('color: "#ffffff"', 'color: "var(--nv-onSurf)"')
                        line = line.replace("color: '#fff'", "color: 'var(--nv-onSurf)'")
                        line = line.replace("color: '#ffffff'", "color: 'var(--nv-onSurf)'")
                        lines[i] = line
                        modified = True
                        
            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write('\n'.join(lines))
                print(f'Updated {filepath}')
