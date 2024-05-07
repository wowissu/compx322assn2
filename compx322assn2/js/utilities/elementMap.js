/**
 * Represents a custom Map implementation for storing DOM elements.
 */
export class ElementMap extends Map {
  /**
   * Creates an instance of ElementMap.
   * @param {...*} args - Arguments to pass to the superclass constructor.
   */
  constructor(...args) {
    super(...args);
    this.elementMap = new Map();
  }

  /**
   * Retrieves the DOM element associated with the given key.
   * If the key is not found, it returns undefined.
   * @param {*} key - The key used to retrieve the DOM element.
   * @param {boolean} [force=false] - Whether to force re-querying the document for the element(s) even if cached.
   * @returns {HTMLElement|NodeList|undefined} The DOM element associated with the key, or undefined if not found.
   */
  get(key, force = false) {
    // Check if the key exists in the map
    const hasSelector = super.has(key);

    // If the key does not exist in the map, return undefined
    if (hasSelector === false) {
      return undefined;
    }
    // If the key exists, the corresponding elements are cached, and 'force' is not true, return the cached element(s)
    else if (hasSelector && this.elementMap.has(key) && force === false) {
      return this.elementMap.get(key);
    }

    // Retrieve the CSS selector associated with the key
    const selector = super.get(key);
    // Query the document for elements matching the selector
    const nodeList = document.querySelectorAll(selector);

    // If only one element matches the selector, cache and return the element itself
    if (nodeList.length === 1) {
      this.elementMap.set(key, nodeList[0]);
      return nodeList[0];
    }
    // If multiple elements match the selector, cache and return the NodeList
    else {
      this.elementMap.set(key, nodeList);
      return nodeList;
    }
  }

  /**
   * Deletes the DOM element associated with the given key.
   * @param {*} key - The key of the DOM element to delete.
   * @returns {boolean} True if the DOM element was successfully deleted, false otherwise.
   */
  delete(key) {
    this.elementMap.delete(key);
    return super.delete(key);
  }

  /**
   * Clears all stored DOM elements from the map.
   * @returns {void}
   */
  clear() {
    this.elementMap.clear();
    return super.clear();
  }
}
