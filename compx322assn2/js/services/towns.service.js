import { Town } from '../entities/Town.js';
import { EventUtility } from '../utilities/event.js';

// Event type for when town's data is loaded
export const ON_LOAD_TOWNS = 'ON_LOAD_TOWNS';

/**
 * Represents a service for managing towns data.
 */
export class TownService {
  /** @type {EventUtility} */
  #eu = new EventUtility();

  /**
   * Fetches towns data asynchronously from the server.
   * @returns {Promise<Town[]>} A promise that resolves with an array of Town objects.
   * @throws {Error} If fetching towns data fails.
   */
  async fetch() {
    const data = await fetch('./fetchTowns.php').then((res) => res.json());

    if (data.status === 'ok') {
      const towns = data.data.map((town) => {
        return new Town(town);
      });

      this.#eu.dispatchEvent(ON_LOAD_TOWNS, towns);
      return towns;
    } else {
      throw new Error('Can not fetch towns.');
    }
  }

  /**
   * Adds a callback function to execute when towns data is loaded.
   * @param {function} callback - The callback function to execute.
   * @returns {TownService}
   */
  onload(callback) {
    this.#eu.addEventListener(ON_LOAD_TOWNS, callback);
    return this;
  }
}
