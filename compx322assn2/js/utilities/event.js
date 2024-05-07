export class EventUtility {
  // Creating a shared element for globally trigger event
  static sharedScope = newScope();

  scope;

  /**
   * Represents a utility for working with DOM events.
   * @constructor
   */
  constructor(scope = false) {
    this.scope = scope === true ? newScope() : EventUtility.sharedScope;
  }

  /**
   * Adds an event listener to the element.
   * @param {string} name - The name of the event to listen for.
   * @param {function} callback - The function to call when the event occurs.
   * @returns {void}
   */
  addEventListener(name, callback) {
    this.scope.addEventListener(name, callback);
  }

  /**
   * Dispatches a custom event with optional data.
   * @param {string} name - The name of the custom event to dispatch.
   * @param {*} data - Optional data to include with the event.
   * @returns {void}
   */
  dispatchEvent(name, data) {
    const ce = new CustomEvent(name, { detail: data });
    this.scope.dispatchEvent(ce);
  }
}

function newScope() {
  return document.createElement('div');
}
