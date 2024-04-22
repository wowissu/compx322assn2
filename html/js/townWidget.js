import { Town } from './entities/Town.js';
import { EventUtility } from './utilities/event.js';

// Event types for when a town is unselected and when its graph is requested to be shown
const ON_TOWN_UNSELECT = 'ON_TOWN_UNSELECT';
const ON_TOWN_SHOW_GRAPH = 'ON_TOWN_SHOW_GRAPH';

/**
 * Represents a widget for displaying town cards.
 */
export class TownWidget {
  /** @type {HTMLElement} */
  #el;
  /** @type {EventUtility} */
  #eventUtility = new EventUtility();
  /** @type {Town[]} */
  #towns = [];
  /** @type {HTMLElement[]} */
  #cards = [];

  /**
   * Constructs a new TownWidget instance.
   * @param {string} selector - The CSS selector for the element containing the TownWidget.
   */
  constructor(selector) {
    this.#el = document.querySelector(selector);
  }

  /**
   * Clears the TownWidget by removing all town cards.
   * @returns {TownWidget} The TownWidget instance for method chaining.
   */
  clear() {
    this.#cards.forEach((o) => o.remove());

    return this;
  }

  /**
   * Renders the TownWidget with town cards.
   * @returns {void}
   */
  render() {
    this.clear();

    this.#cards = this.#towns.map((town) => {
      const card = town.makeCard();
      const remove = card.querySelector('[ref="remove"]');
      const show = card.querySelector('[ref="show"]');

      remove.addEventListener('click', () => {
        // Dispatch event when a town is unselected
        this.#eventUtility.dispatchEvent(ON_TOWN_UNSELECT, town);
      });

      show.addEventListener('click', () => {
        // Dispatch event when a town's graph is requested to be shown
        this.#eventUtility.dispatchEvent(ON_TOWN_SHOW_GRAPH, town);
      });

      return card;
    });
    this.#el.append(...this.#cards);
  }

  /**
   * Sets the towns to be displayed in the TownWidget.
   * @param {Town[]} newTowns - The array of Town objects to set.
   * @returns {TownWidget} The TownWidget instance for method chaining.
   */
  setTowns(newTowns) {
    this.#towns = newTowns;

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
   * Adds a callback function to execute when a town is unselected.
   * @param {function} callback - The callback function to execute.
   * @returns {void}
   */
  onUnselect(callback) {
    this.#eventUtility.addEventListener(ON_TOWN_UNSELECT, callback);
  }

  /**
   * Adds a callback function to execute when a town's graph is requested to be shown.
   * @param {function} callback - The callback function to execute.
   * @returns {void}
   */
  onShow(callback) {
    this.#eventUtility.addEventListener(ON_TOWN_SHOW_GRAPH, callback);
  }
}
