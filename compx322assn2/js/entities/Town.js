import { TomorrowService } from '../services/tomorrow.service.js';
import { Template } from '../utilities/template.js';

// Creating an instance of TomorrowService
const tomorrowServoce = new TomorrowService();

/**
 * @typedef {object} TomorrowData
 * @property {number} temperature - The temperature
 */

/**
 * @typedef {object} TomorrowRow
 * @property {string} time - The time.
 * @property {TomorrowData} values - The data values.
 */

/**
 * Represents a Town object with properties representing its details.
 */
export class Town {
  /** @type {{ daily: TomorrowRow[] , hourly: TomorrowRow[] }} */
  #timelines;

  /**
   * The English name of the town.
   * @type {string}
   */
  engname;

  /**
   * The longitude coordinate of the town.
   * @type {string}
   */
  lon;

  /**
   * The latitude coordinate of the town.
   * @type {string}
   */
  lat;

  /**
   * The name of the town.
   * @type {string}
   */
  name;

  /**
   * The unique identifier of the town.
   * @type {string}
   */
  id;

  /**
   * Additional information about the town.
   * @type {string}
   */
  info;

  /**
   * Creates an instance of the Town object.
   * @param {Object} arg - An object containing the properties of the Town.
   * @param {string} arg.engname - The English name of the town.
   * @param {string} arg.lon - The longitude coordinate of the town.
   * @param {string} arg.lat - The latitude coordinate of the town.
   * @param {string} arg.name - The name of the town.
   * @param {string} arg.id - The unique identifier of the town.
   * @param {string} arg.info - Additional information about the town.
   */
  constructor(arg) {
    this.engname = arg.engname;
    this.lon = arg.lon;
    this.lat = arg.lat;
    this.name = arg.name;
    this.id = arg.id;
    this.info = arg.info;
  }

  /**
   * Creates an option element for the town.
   * @returns {HTMLOptionElement} The created option element.
   */
  makeOption() {
    const option = document.createElement('option');

    option.value = this.id;
    option.innerText = this.name;
    option.classList.add('town-option');

    return option;
  }

  /**
   * Creates a card element for the town.
   * @returns {HTMLElement} The created card element.
   */
  makeCard() {
    const card = Template.clone('town-card');
    const name = card.querySelector('[ref="name"]');
    const engname = card.querySelector('[ref="engname"]');
    const info = card.querySelector('[ref="info"]');
    const remove = card.querySelector('[ref="remove"]');
    const show = card.querySelector('[ref="show"]');

    name.innerHTML = this.name;
    engname.innerHTML = this.engname;
    info.innerHTML = this.info;

    return card;
  }

  /**
   * Creates a checkbox element for the town.
   * @returns {HTMLElement} The created checkbox element.
   */
  makeCheckbox() {
    const checkbox = Template.clone('town-checkbox');

    const input = checkbox.querySelector('[ref="input"]');
    const label = checkbox.querySelector('[ref="label"]');

    input.value = this.id;
    label.innerHTML = this.name;

    input.setAttribute('id', `town-${this.id}`);
    label.setAttribute('for', `town-${this.id}`);

    return checkbox;
  }

  /**
   * Fetches tomorrow's weather data for the town asynchronously.
   * @returns {Promise<void>} A promise that resolves when the data is fetched.
   */
  async fetchTomorrow() {
    const data = await tomorrowServoce.fetch(this);
    this.#timelines = data.timelines;
  }

  /**
   * Retrieves tomorrow's hourly weather data for the town.
   * @returns {TomorrowRow[]} An array of TomorrowRow objects representing hourly weather data.
   */
  get hourly() {
    return this.#timelines.hourly;
  }
}
