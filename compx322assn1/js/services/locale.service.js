import { useEvent } from '../event.js';
import { useScope } from '../util.js';

/**
 * Locale service
 */

/**
 * Avliable locales and it's general name
 *
 * @type {Record<string, string>}
 */
export const localeDictionary = {
  us: 'United States (US)',
  au: 'Australia (AU)',
  nz: 'New Zealand (NZ)',
  gb: 'United Kingdom (GB)',
};

export const useLocaleService = useScope(() => {
  const e = useEvent();
  let currentLocale = 'nz';

  function setCurrentLocale(l, dispatch = true) {
    currentLocale = l;

    if (dispatch) {
      e.dispatchEvent(e.ON_LOCALE_CHANGE, currentLocale);
    }
  }

  function getCurrentLocale() {
    return currentLocale;
  }

  return () => ({
    setCurrentLocale,
    getCurrentLocale,
  });
});
