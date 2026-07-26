import os

file_css = "d:/Nightvision/website/frontend/src/styles/global.css"
with open(file_css, "r", encoding="utf-8") as f:
    css_data = f.read()

# Remove the header logo inversion
old_header_style = """
/* HEADER LOGO INVERSION FOR LIGHT MODE (Keeps it readable without a box) */
html.light .app-header img[src*="logo.png"] {
  filter: brightness(0);
}
"""

if old_header_style in css_data:
    css_data = css_data.replace(old_header_style, "")
else:
    print("Could not find the exact string, trying a more flexible replace...")
    import re
    css_data = re.sub(
        r'/\*\s*HEADER LOGO INVERSION FOR LIGHT MODE.*?\*/\s*html\.light \.app-header img\[src\*="logo\.png"\]\s*\{\s*filter:\s*brightness\(0\);\s*\}\s*',
        '',
        css_data,
        flags=re.DOTALL
    )

with open(file_css, "w", encoding="utf-8") as f:
    f.write(css_data)

print("Removed header logo inversion from global.css")
