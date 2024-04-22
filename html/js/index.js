import { TownService } from './services/towns.service.js';
import { TownWidget } from './townWidget.js';
import { TownSelect } from './townSelect.js';
import { Template } from './utilities/template.js';
import { TownGraph } from './townGraph.js';
import { TownComparison } from './townComparison.js';

// Initialize the town service
const townService = new TownService();

// Initialize the template utility
Template.init();

/** Application entry point */
window.onload = async function init() {
  // Get the button to show town comparison
  const showComparisonButton = document.getElementById('show-comparison-button');

  // Arrays to store selected and unselected towns
  let towns = [];
  let unselectedTowns = [];
  let selectedTowns = [];

  // Initialize instances of the required components
  const townSelect = new TownSelect('#town-select');
  const townWidget = new TownWidget('#town-list');
  const townComparison = new TownComparison('#comparison-list');
  const graph = new TownGraph('#graph-canvas');

  // Event listener for selecting a town from the town select component
  townSelect.onSelect((event) => {
    const town = event.detail;
    // Move the selected town from unselected to selected
    unselectedTowns = unselectedTowns.filter((t) => t !== town);
    selectedTowns.push(town);

    // Update town select, town widget, and town comparison components
    townSelect.setTowns(unselectedTowns).render();
    townWidget.setTowns(selectedTowns).render();
    townComparison.setTowns(selectedTowns).render();
  });

  // Event listener for unselecting a town from the town widget component
  townWidget.onUnselect((event) => {
    const town = event.detail;
    // Move the unselected town from selected to unselected
    selectedTowns = selectedTowns.filter((t) => t !== town);
    unselectedTowns.push(town);

    // Update town select, town widget, and town comparison components
    townSelect.setTowns(unselectedTowns).render();
    townWidget.setTowns(selectedTowns).render();
    townComparison.setTowns(selectedTowns).render();
  });

  // Event listener for showing a town's graph from the town widget component
  townWidget.onShow(async (event) => {
    // Get the selected town
    const town = event.detail;

    // Fetch tomorrow's data for the selected town
    await town.fetchTomorrow();

    // Set the selected town for the graph and render it
    graph.setTowns([town]);
    graph.render();
  });

  // Event listener for showing the town comparison component
  showComparisonButton.addEventListener('click', () => {
    townComparison.trigger();
  });

  // Event listener for showing the comparison graph for selected towns
  townComparison.onShowComparison(async (event) => {
    // Get the selected towns for comparison
    const towns = event.detail;

    // Fetch tomorrow's data for all selected towns
    await Promise.all(towns.map((town) => town.fetchTomorrow()));

    // Set the selected towns for the graph and render it
    graph.setTowns(towns);
    graph.render();
  });

  // Event listener for loading towns data
  townService.onload((event) => {
    // Append the fetched towns to the existing list
    towns = towns.concat(event.detail);
    unselectedTowns = towns;

    // Set and render towns for the town select component
    townSelect.setTowns(towns).render();
  });

  // Fetch towns data
  townService.fetch();
};
