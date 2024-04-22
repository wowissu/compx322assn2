import { Town } from './entities/Town.js';
import { EventUtility } from './utilities/event.js';
import { Template } from './utilities/template.js';

// Event type for when a town is selected
const ON_TOWN_SELECT = 'ON_TOWN_SELECT';

/**
 * Represents a dropdown select component for towns.
 */
export class TownSelect {
  /** @type {HTMLElement} */
  #el;
  /** @type {EventUtility} */
  #eventUtility = new EventUtility();
  /** @type {Town[]} */
  #towns = [];
  /** @type {HTMLOptionElement[]} */
  #options = [];
  /** @type {HTMLElement} */
  #appendTo;

  /**
   * Constructs a new TownSelect instance.
   * @param {string} selector - The CSS selector for the element to which the TownSelect will be appended.
   */
  constructor(selector) {
    this.#appendTo = document.querySelector(selector);
    this.#el = Template.clone('town-select');
    this.#el.addEventListener('change', () => {
      // Find the selected town
      const town = this.findTown(this.#el.value);
      // Dispatch event with the selected town
      this.#eventUtility.dispatchEvent(ON_TOWN_SELECT, town);
    });
  }

  /**
   * Clears the TownSelect element and its options.
   * @returns {TownSelect} The TownSelect instance for method chaining.
   */
  clear() {
    this.#el.remove();
    this.#options.forEach((o) => o.remove());

    return this;
  }

  /**
   * Renders the TownSelect with its options.
   * @returns {void}
   */
  render() {
    this.clear();

    this.#options = this.#towns.map((town) => {
      const option = town.makeOption();

      return option;
    });
    this.#el.append(...this.#options);
    this.#appendTo.append(this.#el);
  }

  /**
   * Sets the towns to be displayed in the TownSelect.
   * @param {Town[]} newTowns - The array of Town objects to set.
   * @returns {TownSelect} The TownSelect instance for method chaining.
   */
  setTowns(newTowns) {
    // Sort the towns alphabetically by name
    this.#towns = newTowns.sort((a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0));

    return this;
  }

  /**
   * Finds a town by its ID.
   * @param {string} id - The ID of the town to find.
   * @returns {Town|undefined} The found Town object, or undefined if not found.
   */
  findTown(id) {
    return this.#towns.find((t) => t.id === id);
  }

  /**
   * Adds a callback function to execute when a town is selected.
   * @param {function} callback - The callback function to execute.
   * @returns {void}
   */
  onSelect(callback) {
    this.#eventUtility.addEventListener(ON_TOWN_SELECT, callback);
  }
}
