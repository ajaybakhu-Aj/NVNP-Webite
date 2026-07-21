import os
import re

base_path = "d:/Nightvision/website/frontend/src/components/home"

# 1. WhySection.jsx
file_why = os.path.join(base_path, "WhySection.jsx")
with open(file_why, "r", encoding="utf-8") as f:
    why_data = f.read()

# Add color to h2
why_data = re.sub(
    r'(<h2\s+style={{[^}]*?wordBreak:\s*"break-word",)',
    r'\1\n              color: "var(--nv-onSurf)",',
    why_data
)
# Change colors.secondary for feats to var(--nv-text-accent)
# "The NightVision Edge" span
why_data = why_data.replace('color: colors.secondary,', 'color: "var(--nv-text-accent)",')

with open(file_why, "w", encoding="utf-8") as f:
    f.write(why_data)

# 2. ProductsSection.jsx
file_prod = os.path.join(base_path, "ProductsSection.jsx")
with open(file_prod, "r", encoding="utf-8") as f:
    prod_data = f.read()

prod_data = re.sub(
    r'(<h2\s+style={{[^}]*?wordBreak:\s*"break-word",)',
    r'\1\n                color: "var(--nv-onSurf)",',
    prod_data
)

with open(file_prod, "w", encoding="utf-8") as f:
    f.write(prod_data)

# 3. FounderSection.jsx
file_found = os.path.join(base_path, "FounderSection.jsx")
with open(file_found, "r", encoding="utf-8") as f:
    found_data = f.read()

found_data = re.sub(
    r'(<blockquote\s+style={{[^}]*?wordBreak:\s*"break-word",)',
    r'\1\n              color: "var(--nv-onSurf)",',
    found_data
)

with open(file_found, "w", encoding="utf-8") as f:
    f.write(found_data)

# 4. TestimonialsSection.jsx
file_testi = os.path.join(base_path, "TestimonialsSection.jsx")
with open(file_testi, "r", encoding="utf-8") as f:
    testi_data = f.read()

testi_data = re.sub(
    r'(<h2\s+style={{[^}]*?wordBreak:\s*"break-word",)',
    r'\1\n            color: "var(--nv-onSurf)",',
    testi_data
)

testi_data = re.sub(
    r'(<p\s+style={{[^}]*?wordBreak:\s*"break-word",)',
    r'\1\n                  color: "var(--nv-onSurf)",',
    testi_data
)

# Replace author color
testi_data = testi_data.replace(
    'color: colors.secondary,\n\n                  fontFamily: "\'Inter\', sans-serif",',
    'color: "var(--nv-onSurf)",\n\n                  fontFamily: "\'Inter\', sans-serif",'
)
testi_data = testi_data.replace(
    'color: colors.secondary,\n                  fontFamily: "\'Inter\', sans-serif",',
    'color: "var(--nv-onSurf)",\n                  fontFamily: "\'Inter\', sans-serif",'
)

with open(file_testi, "w", encoding="utf-8") as f:
    f.write(testi_data)

print("Updated inline styles in WhySection, ProductsSection, FounderSection, TestimonialsSection")
