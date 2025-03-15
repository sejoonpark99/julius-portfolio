import imagesLoaded from 'imagesloaded';
import WebFont from 'webfontloader';

/**
 * Preload images
 * @param {String} selector - Selector/scope from where images need to be preloaded. Default is 'img'
 */
export const preloadImages = (selector = 'img'): Promise<void> => {
  return new Promise((resolve) => {
    const imgLoad = imagesLoaded(
      document.querySelectorAll(selector), 
      { background: true }
    );
    imgLoad.on('done', () => resolve());
  });
};

/**
 * Preload fonts
 * @param {String} id - Typekit ID
 */
export const preloadFonts = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    WebFont.load({
      typekit: {
        id: id
      },
      active: resolve
    });
  });
};