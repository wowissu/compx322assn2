import { Town } from './entities/Town.js';

export class TownGraph {
  #chart;

  #canvas;
  /** @type {Town[]} */
  #towns;

  constructor(selector) {
    this.#canvas = document.querySelector(selector);
  }

  setTown(town) {
    this.setTowns([town]);
  }

  setTowns(towns) {
    this.#towns = towns;

    return this;
  }

  render() {
    const towns = this.#towns;
    const firstTown = towns[0];
    const labels = firstTown.hourly.map((h) => {
      const d = new Date(h.time);

      console.log(d);

      return `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`;
    });

    const datasets = towns.map((town) => {
      return {
        label: town.name,
        data: town.hourly.map((h) => {
          return h.values.temperature;
        }),
        borderWidth: 1,
      };
    });

    if (this.#chart) {
      this.#chart.destroy();
    }

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
