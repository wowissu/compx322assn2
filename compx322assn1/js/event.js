let el = document.createElement('div');

export function useEvent() {
  return {
    ON_TOPICS_ACTIVE_CHANGE: 'ON_TOPIC_ACTIVE_CHANGE',
    ON_LOCALE_CHANGE: 'ON_LOCALE_CHANGE',
    ON_TOPIC_CHANGE: 'ON_TOPIC_CHANGE',
    addEventListener(name, callback) {
      el.addEventListener(name, callback);
    },
    dispatchEvent(name, data) {
      const ce = new CustomEvent(name, { detail: data });
      el.dispatchEvent(ce);
    },
  };
}
