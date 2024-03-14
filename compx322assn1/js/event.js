{
  let el = document.createElement('div');

  function useEvent() {
    return {
      ON_ACTIVE_CHANGE: "on_active_change",
      addEventListener(name, callback) {
        el.addEventListener(name, callback);
      },
      dispatchEvent(name, data) {
        const ce = new CustomEvent(name, { detail: data })
        el.dispatchEvent(ce);
      }
    }
  }
}