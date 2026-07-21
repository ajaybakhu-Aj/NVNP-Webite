import os
import re

file_footer = "d:/Nightvision/website/frontend/src/components/ui/Footer.jsx"
with open(file_footer, "r", encoding="utf-8") as f:
    footer_data = f.read()

# Replace hardcoded #fff with var(--nv-onSurf) in specific places
# 1. Reach Us list
footer_data = footer_data.replace(
    'style={{ color: "#fff", fontSize: "14px", lineHeight: "1.6", gap: "16px" }}',
    'style={{ color: "var(--nv-onSurf)", fontSize: "14px", lineHeight: "1.6", gap: "16px" }}'
)

# 2. SUBSCRIBE FOR UPDATES h6
footer_data = footer_data.replace(
    'color: "#fff",\n            fontSize: "11px",',
    'color: "var(--nv-onSurf)",\n            fontSize: "11px",'
)

# 3. Input placeholder text color (keep input text white as background is dark green "#1e2117")
# The background is "#1e2117". In light mode, a dark background with white text is fine.
# But wait, maybe I should make the input background dynamic too?
# background: "var(--nv-surfCont)" and color: "var(--nv-onSurf)"
# border: "1px solid var(--nv-outlineVar)"
footer_data = footer_data.replace(
    'background: "#1e2117",\n                border: "1px solid #434938",\n                padding: "10px 14px",\n                color: "#fff",',
    'background: "var(--nv-surfHi)",\n                border: "1px solid var(--nv-outlineVar)",\n                padding: "10px 14px",\n                color: "var(--nv-onSurf)",'
)

# 4. Subscribe Button
# background: "#b5e75d", color: "#000"
# This is fine in light mode.

# 5. Brand description text color
footer_data = footer_data.replace(
    'color: "#8d937f", margin: "0 0 16px 0", maxWidth: "420px" }}',
    'color: "var(--nv-onSurfVar)", margin: "0 0 16px 0", maxWidth: "420px" }}'
)

# 6. Badges list text color
footer_data = footer_data.replace(
    'color: "#8d937f" \n          }}>',
    'color: "var(--nv-onSurfVar)" \n          }}>'
)

# 7. Stay informed text
footer_data = footer_data.replace(
    'color: "#8d937f",\n            fontSize: "13px",',
    'color: "var(--nv-onSurfVar)",\n            fontSize: "13px",'
)

with open(file_footer, "w", encoding="utf-8") as f:
    f.write(footer_data)

print("Updated Footer.jsx")
