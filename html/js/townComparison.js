import { Town } from './entities/Town.js';
import { EventUtility } from './utilities/event.js';

// Event type for showing town comparison
const SHOW_TOWNS_COMPARISON = 'SHOW_TOWNS_COMPARISON';

/**
 * Represents a component for comparing towns.
 */
export class TownComparison {
  /** @type {EventUtility} */
  #eventUtility = new EventUtility();

  /** @type {HTMLElement} */
  #el;

  /** @type {Town[]} */
  #towns = [];

  /**
   * Constructs a new TownComparison instance.
   * @param {string} selector - The CSS selector for the element containing the TownComparison component.
   */
  constructor(selector) {
    this.#el = document.querySelector(selector);
    this.hide();

    const go = this.#el.querySelector('[ref=go]');

    go.addEventListener('click', () => {
      // Get selected checkboxes
      const checkedCheckboxes = this.#el.querySelectorAll('input[ref=input]:checked');
      const townIds = [];

      checkedCheckboxes.forEach((checkbox) => {
        townIds.push(checkbox.value);
      });

      // Filter towns to be compared based on selected checkboxes
      const townsToBeComparison = this.#towns.filter((t) => townIds.indexOf(t.id) > -1);

      // Dispatch event to show town comparison
      this.#eventUtility.dispatchEvent(SHOW_TOWNS_COMPARISON, townsToBeComparison);
    });
  }

  /**
   * Clears the checkbox list.
   * @returns {void}
   */
  clear() {
    const checkboxList = this.#el.querySelector('[ref=list]');
    checkboxList.innerHTML = '';
  }

  /**
   * Shows the TownComparison component.
   * @returns {void}
   */
  show() {
    if (this.#towns.length > 0) {
      this.#el.classList.remove('hidden');
    }
  }

  /**
   * Hides the TownComparison component.
   * @returns {void}
   */
  hide() {
    this.#el.classList.add('hidden');
  }

  /**
   * Toggles the visibility of the TownComparison component.
   * @returns {void}
   */
  trigger() {
    this.#el.classList.contains('hidden') ? this.show() : this.hide();
  }

  /**
   * Adds a callback function to execute when town comparison is requested to be shown.
   * @param {function} callback - The callback function to execute.
   * @returns {void}
   */
  onShowComparison(callback) {
    this.#eventUtility.addEventListener(SHOW_TOWNS_COMPARISON, callback);
  }

  /**
   * Sets the towns to be displayed in the TownComparison component.
   * @param {Town[]} newTowns - The array of Town objects to set.
   * @returns {TownComparison} The TownComparison instance for method chaining.
   */
  setTowns(newTowns) {
    this.#towns = newTowns;

    return this;
  }

  /**
   * Renders the TownComparison component with checkboxes for each town.
   * @returns {void}
   */
  render() {
    const checkboxes = this.#towns.map((town) => {
      return town.makeCheckbox();
    });

    const checkboxList = this.#el.querySelector('[ref=list]');
    checkboxList.replaceChildren(...checkboxes);
  }
}
