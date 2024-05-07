import { Town } from './entities/Town.js';

/**
 * Represents a graphical representation of temperature data for multiple towns.
 */
export class TownGraph {
  /** @type {Chart} */
  #chart;

  /** @type {HTMLCanvasElement} */
  #canvas;

  /** @type {Town[]} */
  #towns;

  /**
   * Creates an instance of TownGraph.
   * @param {string} selector - The CSS selector for the canvas element.
   */
  constructor(selector) {
    this.#canvas = document.querySelector(selector);
  }

  /**
   * Sets a single town for the graph.
   * @param {Town} town - The town object to be displayed on the graph.
   */
  setTown(town) {
    this.setTowns([town]);
  }

  /**
   * Sets multiple towns for the graph.
   * @param {Town[]} towns - An array of town objects to be displayed on the graph.
   * @returns {TownGraph} The TownGraph instance.
   */
  setTowns(towns) {
    this.#towns = towns;
    return this;
  }

  /**
   * Renders the graph using the provided town data.
   */
  render() {
    // Extract town data and labels
    const towns = this.#towns;
    const firstTown = towns[0];
    const labels = firstTown.hourly.map((h) => {
      const d = new Date(h.time);
      return `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`;
    });

    // Prepare datasets for each town
    const datasets = towns.map((town) => {
      return {
        label: town.name,
        data: town.hourly.map((h) => {
          return h.values.temperature;
        }),
        borderWidth: 1,
      };
    });

    // Destroy the existing chart if present
    if (this.#chart) {
      this.#chart.destroy();
    }

    // Create a new chart instance
    this.#chart = new Chart(this.#canvas, {
      type: 'line',
      data: {
        labels,
        datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
