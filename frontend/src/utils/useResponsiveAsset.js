import { useState, useEffect } from "react";

/**
 * Custom React hook to fetch optimized asset with responsive srcset parameters
 * from the Django file-upload pipeline API.
 * 
 * @param {number|string} assetId The ID of the MediaAsset to load.
 * @returns {object} { asset: { src, alt, srcSet }, loading, error }
 */
export function useResponsiveAsset(assetId) {
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!assetId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/api/assets/${assetId}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load asset. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.file) {
          // Construct HTML5 compatible srcSet parameter string
          // E.g. "/media/assets/nightvision-4mp-400w.webp 400w, /media/assets/nightvision-4mp-800w.webp 800w"
          const srcSetString = Object.entries(data.srcset_data || {})
            .map(([size, url]) => `${url} ${size}`)
            .join(", ");

          setAsset({
            src: data.file,
            alt: data.alt_text || "",
            srcSet: srcSetString || undefined,
            isHeader: data.is_header,
          });
        } else {
          setAsset(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading optimized responsive asset:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [assetId]);

  return { asset, loading, error };
}
