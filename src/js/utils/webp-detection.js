/**
 * WebP Detection Utility
 *
 * Detects if the browser supports WebP format and adds a class to the HTML element.
 * This allows CSS to use WebP images with PNG fallback.
 */

/**
 * Check if browser supports WebP
 * @returns {Promise<boolean>} Promise that resolves to true if WebP is supported
 */
function supportsWebP() {
  return new Promise((resolve) => {
    const webpData =
      "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=";
    const img = new Image();

    img.onload = () => {
      resolve(img.width === 2 && img.height === 1);
    };

    img.onerror = () => {
      resolve(false);
    };

    img.src = webpData;
  });
}

/**
 * Initialize WebP detection
 * Adds 'webp' or 'no-webp' class to the HTML element
 */
export async function initWebPDetection() {
  try {
    const isSupported = await supportsWebP();
    const htmlElement = document.documentElement;

    if (isSupported) {
      htmlElement.classList.add("webp");
      htmlElement.classList.remove("no-webp");
    } else {
      htmlElement.classList.add("no-webp");
      htmlElement.classList.remove("webp");
    }

    return isSupported;
  } catch (error) {
    console.error("WebP detection failed:", error);
    // Default to no WebP support on error
    document.documentElement.classList.add("no-webp");
    return false;
  }
}

export default initWebPDetection;
