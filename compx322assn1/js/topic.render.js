import { useEvent } from './event.js';
import { useTopicService } from './services/topic.service.js';
import { emptyElement } from './util.js';

/**
 * Current Topic Renderer
 * @param {string|HTMLElement} appendTo
 */
export function useCurrentTopics(appendTo) {
  const ts = useTopicService();

  // render current Topics.
  function render() {
    const ul = document.querySelector(appendTo);
    emptyElement(ul);

    ts.getActivedTopics().forEach((t) => {
      const li = document.createElement('li');
      li.innerHTML = t.topic;
      li.classList.add('topic_item');

      /** To search news when click topic */
      li.addEventListener('click', () => {
        // set current topic
        ts.setCurrentTopic(t);
      });

      ul.appendChild(li);
    });
  }

  return {
    render,
  };
}

/**
 * Add Topic Renderer
 * @param {string|HTMLElement} appendTo
 */
export function useAddTopic(appendTo) {
  const ts = useTopicService();

  /** @type {boolean} */
  let display = false;

  function hide() {
    display = false;
    document.querySelector(appendTo).classList.add('hidden');
    // render();
  }

  function show() {
    display = true;
    document.querySelector(appendTo).classList.remove('hidden');
    render();
  }

  function trigger() {
    display ? hide() : show();
  }

  function render() {
    const el = document.querySelector(appendTo);
    const ul = el.querySelector(':scope > ul');
    emptyElement(ul);

    // stop render when display is false
    if (!display) {
      return;
    }

    ts.getInactivedTopics().forEach((t) => {
      const li = createTopicCheckbox(t);
      ul.appendChild(li);
    });
  }

  async function submit() {
    const checkboxNodeList = document.querySelectorAll(`${appendTo} > ul input:checked`);

    if (!checkboxNodeList.length) return;

    const checkboxs = Array.apply(null, checkboxNodeList);
    const ids = checkboxs.map((c) => c.value);

    await ts.updateActiveTopics(ids);
    await ts.fetchTopics();
  }

  return {
    hide,
    show,
    trigger,
    render,
    submit,
  };
}

/**
 * Remove Topic Renderer
 * @param {string|HTMLElement} appendTo
 */
export function useRemoveTopics(appendTo) {
  const topicService = useTopicService();

  /** @type {boolean} */
  let display = false;

  function hide() {
    display = false;
    document.querySelector(appendTo).classList.add('hidden');
    // render();
  }

  function show() {
    display = true;
    document.querySelector(appendTo).classList.remove('hidden');
    render();
  }

  function trigger() {
    display ? hide() : show();
  }

  function render() {
    const el = document.querySelector(appendTo);
    const ul = el.querySelector(':scope > ul');
    emptyElement(ul);

    // stop render when display is false
    if (!display) {
      return;
    }

    topicService.getActivedTopics().forEach((t) => {
      const li = createTopicCheckbox(t);
      ul.appendChild(li);
    });
  }

  async function submit() {
    const checkboxNodeList = document.querySelectorAll(`${appendTo} > ul input:checked`);

    if (!checkboxNodeList.length) return;

    const checkboxs = Array.apply(null, checkboxNodeList);
    const ids = checkboxs.map((c) => c.value);

    await topicService.updateInactiveTopics(ids);
    await topicService.fetchTopics();
  }

  return {
    hide,
    show,
    trigger,
    render,
    submit,
  };
}

/**
 * Create checkbox which is wrapped by label
 * @param {Topic} t
 * @returns {HTMLElement}
 */
function createTopicCheckbox(t) {
  const li = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');

  label.append(checkbox, t.topic);

  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('value', t.id);

  li.classList.add('topic_li');
  li.append(label);

  return li;
}
