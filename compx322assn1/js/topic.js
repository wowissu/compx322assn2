/**
 * @typedef {Object} Topic
 * @property {number} id
 * @property {string} topic
 * @property {number} active 1 or 0
 */

{
  /**
   * @type {Topic[]}
   */
  let topics = [];

  /**
   * Handling Topics data
   */
  function useTopicService() {
    function fetchTopics() {
      return fetch('/fetchTopics.php').then((res) => {      
        return res.json().then((rawData) => parse(rawData)).then((data) => {
          topics = data;
          return res;
        })
      })
    }
  
    function updateActiveTopics(topic_ids) {
      /** @type {RequestInit} */
      const fetchRequestInit = { 
        method: 'put', 
        body: JSON.stringify(topic_ids), 
        headers: {
          "Content-Type": "application/json"
        } 
      }
  
      return fetch('/updateActiveTopics.php', fetchRequestInit)
    }
  
    function updateInactiveTopics(topic_ids) {
      /** @type {RequestInit} */
      const fetchRequestInit = { 
        method: 'put', 
        body: JSON.stringify(topic_ids), 
        headers: {
          "Content-Type": "application/json"
        } 
      }
  
      return fetch('/updateInactiveTopics.php', fetchRequestInit)
    }
  
    function getActiveTopics() {
      return topics.filter(t => t.active === 1)
    }
  
    function getInactiveTopics() {
      return topics.filter(t => t.active === 0)
    }
  
    function parse(responseData) {
      if (responseData.status !== 'ok') {
        throw new Error("response error");
      }
  
      return responseData.data
    }
  
    return {
      fetchTopics,
      updateActiveTopics,
      updateInactiveTopics,
      getActiveTopics,
      getInactiveTopics
    }
  }
}




/**
 * Current Topic Renderer
 * @param {string|HTMLElement} appendTo
 */
function useCurrentTopics(appendTo) {
  const e = useEvent();
  const topicService = useTopicService();

  // render current Topics.
  function render() {  
    const ul = document.querySelector(appendTo);
    emptyElement(ul)

    topicService.getActiveTopics().forEach((t) => {
      const li = document.createElement('li');
      li.innerHTML = t.topic
      ul.appendChild(li);
    })
  }

  e.addEventListener(e.ON_ACTIVE_CHANGE, render)

  return {
    render
  }
}



/**
 * Add Topic Renderer
 * @param {string|HTMLElement} appendTo
 */
function useAddTopic(appendTo) {
  const e = useEvent();
  const topicService = useTopicService();

  /** @type {boolean} */
  let display = false
  
  function hide() {
    display = false
    document.querySelector(appendTo).classList.add('hidden');
    // render();
  }

  function show() {
    display = true;
    document.querySelector(appendTo).classList.remove('hidden');
    render();
  }

  function trigger() {
    display ? hide() : show()
  }

  function render() {
    const el = document.querySelector(appendTo);
    const ul = el.querySelector(":scope > ul");
    emptyElement(ul)

    // stop render when display is false
    if (!display) {
      return;
    }

    topicService.getInactiveTopics().forEach((t) => { 
      const li = document.createElement('li');
      const checkbox = createTopicCheckbox(t);

      li.appendChild(checkbox)
      ul.appendChild(li);
    })
  }

  async function submit() {
    const checkboxNodeList = document.querySelectorAll('#add-topics > ul input:checked');

    if (!checkboxNodeList.length) return;

    const checkboxs = Array.apply(null, checkboxNodeList);
    const ids = checkboxs.map((c) => c.value);

    await topicService.updateActiveTopics(ids);
    await topicService.fetchTopics();

    // dispatch rerender
    e.dispatchEvent(e.ON_ACTIVE_CHANGE);
  }

  // 當需要重新渲染時
  e.addEventListener(e.ON_ACTIVE_CHANGE, render);

  return {
    hide,
    show,
    trigger,
    render,
    submit
  }
}



/**
 * Remove Topic Renderer
 * @param {string|HTMLElement} appendTo
 */
function useRemoveTopics(appendTo) {
  const e = useEvent();
  const topicService = useTopicService();

  /** @type {boolean} */
  let display = false
  
  function hide() {
    display = false
    document.querySelector(appendTo).classList.add('hidden');
    // render();
  }

  function show() {
    display = true;
    document.querySelector(appendTo).classList.remove('hidden');
    render();
  }

  function trigger() {
    display ? hide() : show()
  }

  function render() {
    const el = document.querySelector(appendTo);
    const ul = el.querySelector(":scope > ul");
    emptyElement(ul)

    // stop render when display is false
    if (!display) {
      return;
    }
    
    topicService.getActiveTopics().forEach((t) => { 
      const li = document.createElement('li');
      const checkbox = createTopicCheckbox(t);

      li.appendChild(checkbox)
      ul.appendChild(li);
    })
  }

  async function submit() {
    const checkboxNodeList = document.querySelectorAll('#remove-topics > ul input:checked');

    if (!checkboxNodeList.length) return;

    const checkboxs = Array.apply(null, checkboxNodeList);
    const ids = checkboxs.map((c) => c.value);

    await topicService.updateInactiveTopics(ids);
    await topicService.fetchTopics();

    // dispatch rerender
    e.dispatchEvent(e.ON_ACTIVE_CHANGE);
  }

  // register rerender
  e.addEventListener(e.ON_ACTIVE_CHANGE, render);

  return {
    hide,
    show,
    trigger,
    render,
    submit
  }
}

/**
 * Create checkbox which is wrapped by label
 * @param {Topic} t 
 * @returns {HTMLElement}
 */
function createTopicCheckbox(t) {
  const label = document.createElement('label');
  const checkbox = document.createElement('input');

  label.append(checkbox, t.topic)

  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('value', t.id);

  return label;
}