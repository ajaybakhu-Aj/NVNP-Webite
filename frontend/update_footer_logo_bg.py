import os

file_css = "d:/Nightvision/website/frontend/src/styles/global.css"
with open(file_css, "r", encoding="utf-8") as f:
    css_data = f.read()

# Remove the old brightness(0) filter
old_filter = """
/* LOGO INVERSION FOR LIGHT MODE */
html.light img[src*="logo.png"] {
  filter: brightness(0);
}
"""
css_data = css_data.replace(old_filter, "")

# Add the new attractive black background for the footer logo
new_footer_logo_style = """
/* ATTRACTIVE BLACK BACKGROUND FOR FOOTER LOGO IN LIGHT MODE */
html.light .footer-sub-brand-left a[href="/"] {
  background: linear-gradient(145deg, #181b12 0%, #0d0f0a 100%);
  padding: 14px 28px;
  border-radius: 16px;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(148, 218, 50, 0.15), 0 2px 8px rgba(0,0,0,0.2);
  border: 1px solid rgba(148, 218, 50, 0.2);
  transition: all 0.3s ease;
}

html.light .footer-sub-brand-left a[href="/"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(148, 218, 50, 0.25), 0 4px 12px rgba(0,0,0,0.3);
  border-color: rgba(148, 218, 50, 0.4);
}
"""

if "ATTRACTIVE BLACK BACKGROUND FOR FOOTER LOGO IN LIGHT MODE" not in css_data:
    css_data += new_footer_logo_style

# What about the header logo? Did they want it black?
# The user only mentioned the footer logo. Let's make sure the header logo is also visible if it was invisible before.
# I will use brightness(0) ONLY for the header logo, because a black box in the header might look ugly unless it's designed for it.
header_logo_style = """
/* HEADER LOGO INVERSION FOR LIGHT MODE (Keeps it readable without a box) */
html.light .app-header img[src*="logo.png"] {
  filter: brightness(0);
}
"""
if "HEADER LOGO INVERSION FOR LIGHT MODE" not in css_data:
    css_data += header_logo_style


with open(file_css, "w", encoding="utf-8") as f:
    f.write(css_data)

print("Updated global.css with attractive footer logo background")
