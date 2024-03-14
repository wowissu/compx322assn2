/** init data services */
const topicService = useTopicService();
const newsService = useNewsService();

/** init renderers */
const localeSelect = uselocaleSelect("#country-select", newsService);
const currentTopics = useCurrentTopics("#current-topics", topicService);
const addTopic = useAddTopic("#add-topics", topicService);
const removeTopic = useRemoveTopics("#remove-topics", topicService);

/** app entry */
window.onload = function init() {
  /** fetch Topic and render */
  topicService.fetchTopics().then(() => {
    currentTopics.render();
  });

  /** render locale select */
  localeSelect.render();
}

/**
 * global method: to display/hidden "Add Topic" area
 */
function triggerAddTopicSection() {
  removeTopic.hide();
  addTopic.trigger();
}

/**
 * global method: to display/hidden "Remove Topic" area
 */
function triggerRemoveTopicSection() {
  addTopic.hide();
  removeTopic.trigger();
}

/**
 * global method: to add selected topics
 */
function addCheckedTopics() {
  addTopic.submit();
}

/**
 * global method: to remove selected topics
 */
function removeCheckedTopics() {
  removeTopic.submit();
}

