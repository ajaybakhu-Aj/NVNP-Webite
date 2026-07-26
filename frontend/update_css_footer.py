import os

file_css = "d:/Nightvision/website/frontend/src/styles/global.css"
with open(file_css, "r", encoding="utf-8") as f:
    css_data = f.read()

# Replace .footer-link color
css_data = css_data.replace(
    '.footer-link {\n  color: #fff;',
    '.footer-link {\n  color: var(--nv-onSurf);'
)
css_data = css_data.replace(
    '.footer-link {\n  font-family: \'Poppins\', sans-serif;\n  color: #ffffff;\n  text-decoration: none;\n  font-size: 14px;',
    '.footer-link {\n  font-family: \'Poppins\', sans-serif;\n  color: var(--nv-onSurf);\n  text-decoration: none;\n  font-size: 14px;'
)

# .footer-section-title
css_data = css_data.replace(
    '.footer-section-title {\n  font-family: \'Space Grotesk\', sans-serif;\n  font-size: 14px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  color: #ffffff;\n  margin-bottom: 24px;\n}',
    '.footer-section-title {\n  font-family: \'Space Grotesk\', sans-serif;\n  font-size: 14px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  color: var(--nv-onSurf);\n  margin-bottom: 24px;\n}'
)
css_data = css_data.replace(
    '.footer-section-title {\n  font-family: \'Space Grotesk\', sans-serif;\n  font-size: 13px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  color: #ffffff;\n  margin: 0 0 24px 0;\n}',
    '.footer-section-title {\n  font-family: \'Space Grotesk\', sans-serif;\n  font-size: 13px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  color: var(--nv-onSurf);\n  margin: 0 0 24px 0;\n}'
)

# .footer-copyright-text
css_data = css_data.replace(
    '.footer-copyright-text {\n  font-family: \'Poppins\', sans-serif;\n  font-size: 11px;\n  color: #8d937f;\n  text-align: center;\n  letter-spacing: 1.5px;\n  margin: 0;\n  text-transform: uppercase;\n}',
    '.footer-copyright-text {\n  font-family: \'Poppins\', sans-serif;\n  font-size: 11px;\n  color: var(--nv-onSurfVar);\n  text-align: center;\n  letter-spacing: 1.5px;\n  margin: 0;\n  text-transform: uppercase;\n}'
)
css_data = css_data.replace(
    '.footer-copyright-text {\n  font-family: \'Poppins\', sans-serif;\n  font-size: 12px;\n  color: #8d937f;\n  text-align: center;\n  margin: 0;\n}',
    '.footer-copyright-text {\n  font-family: \'Poppins\', sans-serif;\n  font-size: 12px;\n  color: var(--nv-onSurfVar);\n  text-align: center;\n  margin: 0;\n}'
)
css_data = css_data.replace(
    '.footer-copyright-text {\n  margin: 0;\n  font-size: 12px;\n  color: #8d937f;\n  letter-spacing: 0.5px;\n  line-height: 1.6;\n}',
    '.footer-copyright-text {\n  margin: 0;\n  font-size: 12px;\n  color: var(--nv-onSurfVar);\n  letter-spacing: 0.5px;\n  line-height: 1.6;\n}'
)

# Logo inversion for light mode
if "html.light img[src*=\"logo.png\"] {" not in css_data:
    css_data += """

/* LOGO INVERSION FOR LIGHT MODE */
html.light img[src*="logo.png"] {
  filter: brightness(0);
}
"""

with open(file_css, "w", encoding="utf-8") as f:
    f.write(css_data)

print("Updated global.css for footer")
