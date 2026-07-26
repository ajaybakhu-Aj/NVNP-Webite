document.addEventListener('DOMContentLoaded', function() {
    const titleField = document.getElementById('id_seo_title');
    const descField = document.getElementById('id_meta_description');
    const slugField = document.getElementById('id_slug');
    const ogTitleField = document.getElementById('id_og_title');
    const ogDescField = document.getElementById('id_og_description');
    const ogImageField = document.getElementById('id_og_image');
    const schemaField = document.getElementById('id_schema_override');

    // Fallback to name/title field if SEO fields are empty
    const fallbackTitleField = document.getElementById('id_title') || document.getElementById('id_name');

    // Helper to insert character counters
    function insertCounter(field, maxLen) {
        if (!field) return null;
        const container = document.createElement('div');
        container.style.marginTop = '4px';
        container.style.fontWeight = 'bold';
        container.style.fontSize = '12px';
        
        const counter = document.createElement('span');
        counter.className = 'seo-char-counter';
        
        container.appendChild(counter);
        field.parentNode.appendChild(container);
        return counter;
    }

    const titleCounter = insertCounter(titleField, 60);
    const descCounter = insertCounter(descField, 160);

    // JSON-LD Warning Label
    let schemaWarning = null;
    if (schemaField) {
        schemaWarning = document.createElement('div');
        schemaWarning.style.color = '#d9534f';
        schemaWarning.style.fontSize = '12px';
        schemaWarning.style.marginTop = '5px';
        schemaWarning.style.fontWeight = 'bold';
        schemaWarning.style.display = 'none';
        schemaField.parentNode.appendChild(schemaWarning);
    }

    // Character Length Counter & Color Validation Rules
    function updateCounter(field, counter, maxLen) {
        if (!field || !counter) return;
        const len = field.value.length;
        counter.textContent = `${len} / ${maxLen} characters`;
        
        if (len <= maxLen * 0.9) {
            counter.style.color = '#3c763d'; // Green under 90%
        } else if (len <= maxLen) {
            counter.style.color = '#e67e22'; // Amber within last 10%
        } else {
            counter.style.color = '#a94442'; // Red when exceeding limit
        }
    }

    // Live Render Snippet Engine
    function updatePreviews() {
        // Update Google SERP Title
        const serpTitle = document.getElementById('serp-title');
        if (serpTitle) {
            serpTitle.textContent = (titleField && titleField.value) || 
                                    (fallbackTitleField && fallbackTitleField.value) || 
                                    'Preview Title';
        }

        // Update Google SERP URL structure
        const serpUrl = document.getElementById('serp-url');
        if (serpUrl) {
            const slugText = (slugField && slugField.value) || 'page-slug';
            serpUrl.textContent = `https://yourdomain.com/products/${slugText}/`;
        }

        // Update Google SERP Description
        const serpDesc = document.getElementById('serp-desc');
        if (serpDesc) {
            serpDesc.textContent = (descField && descField.value) || 
                                   'Please write a meta description to see how this page will look in search engines.';
        }

        // Update Open Graph (Social Preview Card)
        const ogTitlePreview = document.getElementById('og-title-preview');
        if (ogTitlePreview) {
            ogTitlePreview.textContent = (ogTitleField && ogTitleField.value) || 
                                         (titleField && titleField.value) || 
                                         (fallbackTitleField && fallbackTitleField.value) || 
                                         'Preview Social Title';
        }

        const ogDescPreview = document.getElementById('og-desc-preview');
        if (ogDescPreview) {
            ogDescPreview.textContent = (ogDescField && ogDescField.value) || 
                                        (descField && descField.value) || 
                                        'Social share description preview.';
        }

        const ogImagePreview = document.getElementById('og-image-preview');
        const ogImageSpan = ogImagePreview ? ogImagePreview.querySelector('span') : null;
        if (ogImagePreview) {
            // If the user selected a new local file, read and preview it dynamically
            if (ogImageField && ogImageField.files && ogImageField.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    ogImagePreview.style.backgroundImage = `url(${e.target.result})`;
                    if (ogImageSpan) ogImageSpan.style.display = 'none';
                }
                reader.readAsDataURL(ogImageField.files[0]);
            } else {
                // If it already exists on server, find Django's generated URL link
                const existingImageLink = ogImageField ? ogImageField.parentNode.querySelector('a') : null;
                if (existingImageLink && existingImageLink.href) {
                    ogImagePreview.style.backgroundImage = `url(${existingImageLink.href})`;
                    if (ogImageSpan) ogImageSpan.style.display = 'none';
                } else {
                    ogImagePreview.style.backgroundImage = 'none';
                    if (ogImageSpan) ogImageSpan.style.display = 'inline';
                }
            }
        }
    }

    // JSON-LD Parser Validation
    function validateSchema() {
        if (!schemaField || !schemaWarning) return;
        const val = schemaField.value.trim();
        
        if (!val) {
            schemaWarning.style.display = 'none';
            schemaField.style.borderColor = '';
            return;
        }

        try {
            const parsed = JSON.parse(val);
            
            // Strictly check for JSON-LD properties
            if (!parsed['@context'] || !parsed['@type']) {
                schemaWarning.textContent = '⚠️ Validation Warning: JSON-LD must contain "@context" and "@type" properties.';
                schemaWarning.style.display = 'block';
                schemaField.style.borderColor = '#e67e22'; // Orange warning border
            } else {
                schemaWarning.style.display = 'none';
                schemaField.style.borderColor = '#3c763d'; // Green validated border
            }
        } catch (e) {
            schemaWarning.textContent = '❌ Validation Error: Malformed JSON structure. Please correct your syntax.';
            schemaWarning.style.display = 'block';
            schemaField.style.borderColor = '#d9534f'; // Red error border
        }
    }

    // Bind real-time tracking events
    if (titleField) {
        titleField.addEventListener('input', () => {
            updateCounter(titleField, titleCounter, 60);
            updatePreviews();
        });
        updateCounter(titleField, titleCounter, 60);
    }
    if (descField) {
        descField.addEventListener('input', () => {
            updateCounter(descField, descCounter, 160);
            updatePreviews();
        });
        updateCounter(descField, descCounter, 160);
    }
    if (slugField) {
        slugField.addEventListener('input', updatePreviews);
    }
    if (ogTitleField) {
        ogTitleField.addEventListener('input', updatePreviews);
    }
    if (ogDescField) {
        ogDescField.addEventListener('input', updatePreviews);
    }
    if (ogImageField) {
        ogImageField.addEventListener('change', updatePreviews);
    }
    if (schemaField) {
        schemaField.addEventListener('input', validateSchema);
        validateSchema();
    }
    if (fallbackTitleField) {
        fallbackTitleField.addEventListener('input', updatePreviews);
    }

    // Initial load sync
    updatePreviews();
});
