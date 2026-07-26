import os
import re

file_app = "d:/Nightvision/website/frontend/src/App.jsx"
with open(file_app, "r", encoding="utf-8") as f:
    app_data = f.read()

# 1. Remove <ThemeToggle /> from the bottom (near line 400)
app_data = app_data.replace("      <ThemeToggle />", "")

# 2. Insert <ThemeToggle /> into GlobalSocialSidebar
# We want it in the middle of the social icons.
# The icons are: facebook, instagram, linkedin, tiktok, x, youtube.
# Let's put it between linkedin and tiktok.
linkedin_anchor = """      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-linkedin"
        title="LinkedIn"
      >
        <Icon name="linkedin" size={18} />
      </a>"""

theme_toggle_insert = """
      {/* Theme Toggle in middle of sidebar */}
      <ThemeToggle />
"""

if linkedin_anchor in app_data:
    app_data = app_data.replace(linkedin_anchor, linkedin_anchor + theme_toggle_insert)
else:
    print("Could not find linkedin anchor in App.jsx")

# The ThemeToggle is already imported in App.jsx at line 64, so no need to import it again.

with open(file_app, "w", encoding="utf-8") as f:
    f.write(app_data)

print("Moved ThemeToggle into GlobalSocialSidebar")
