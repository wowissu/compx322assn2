import { localeDictionary, useLocaleService } from './services/locale.service.js';
import { emptyElement } from './util.js';

/**
 * Locale Select Renderer
 * @param {string|HTMLElement} appendTo
 */
export function uselocaleSelect(appendTo) {
  const ls = useLocaleService();

  function render() {
    const parent = document.querySelector(appendTo);
    const select = document.createElement('select');
    const currentLocale = ls.getCurrentLocale();

    emptyElement(parent).appendChild(select);

    select.addEventListener('change', (event) => {
      // set locale
      ls.setCurrentLocale(event.target.value);
    });

    Object.entries(localeDictionary).forEach(([locale, generalName]) => {
      const option = document.createElement('option');

      option.innerHTML = generalName;
      option.setAttribute('value', locale);
      if (currentLocale === locale) {
        option.setAttribute('selected', 'selected');
      }

      select.appendChild(option);
    });
  }

  return {
    render,
  };
}
