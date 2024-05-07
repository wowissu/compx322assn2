import { Town } from '../entities/Town.js';
import { EventUtility } from '../utilities/event.js';
import townOneData from '../mock/townOneData.js';

// Event type for when tomorrow's data is loaded
export const ON_LOAD_TOMORROW = 'ON_LOAD_TOMORROW';

/**
 * Represents a service for managing tomorrow's weather data.
 */
export class TomorrowService {
  // API key for accessing the tomorrow.io API
  static API_KEY = 'RZWShC6eAp5GHFMargfR7UCtQqud528l';

  /** @type {EventUtility} */
  #eu = new EventUtility();

  /**
   * Fetches tomorrow's weather forecast data for a specified town.
   * @param {Town} town - The town for which to fetch the weather data.
   * @returns {Promise<Object>} A promise that resolves with the fetched weather data.
   */
  async fetch(town) {
    // return this.#mock();

    // Constructing the URL for the tomorrow.io API endpoint
    const url = new URL('https://api.tomorrow.io/v4/weather/history/recent');
    url.searchParams.append('apikey', TomorrowService.API_KEY);
    url.searchParams.append('location', `${town.lat},${town.lon}`);

    // Fetching weather forecast data from the tomorrow.io API
    const data = await fetch(url).then((res) => res.json());
    // Dispatching an event with the fetched data
    this.#eu.dispatchEvent(ON_LOAD_TOMORROW, data);

    return data;
  }

  /**
   * Adds a callback function to execute when tomorrow's weather data is loaded.
   * @param {function} callback - The callback function to execute.
   * @returns {TomorrowService} The TomorrowService instance for method chaining.
   */
  onload(callback) {
    // Adding an event listener for the ON_LOAD_TOMORROW event
    this.#eu.addEventListener(ON_LOAD_TOMORROW, callback);
    // Returning the TomorrowService instance for method chaining
    return this;
  }

  // Method for mocking tomorrow's weather data (for testing purposes)
  #mock() {
    // Dispatching an event with mock data
    this.#eu.dispatchEvent(ON_LOAD_TOMORROW, townOneData);

    return townOneData;
  }
}
