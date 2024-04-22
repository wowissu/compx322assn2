export class Template {
  /** @type {Map<string, Node>} */
  static storage = new Map();

  static init() {
    const templates = document.querySelectorAll('*[template]');
    templates.forEach((n) => {
      const name = n.getAttribute('template');
      n.removeAttribute('template');

      this.storage.set(name, n);
      n.remove();
    });
  }

  static clone(name) {
    const n = this.storage.get(name);

    return n.cloneNode(true);
  }
}
