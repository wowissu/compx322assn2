import { useTopicService } from './services/topic.service.js';
import { useCurrentTopics, useAddTopic, useRemoveTopics } from './topic.render.js';
import { uselocaleSelect } from './locale.render.js';
import { useNewsHeaderRender, useNewsListRender } from './news.render.js';
import { useEvent } from './event.js';
import { useNewsService } from './services/news.service.js';

/** init data services */
const e = useEvent();
const topicService = useTopicService();
const newsService = useNewsService();

/** init renderers */
const newsList = useNewsListRender('#news_ul');
const newsHeader = useNewsHeaderRender('#news_topic');
const localeSelect = uselocaleSelect('#country_select');
const currentTopics = useCurrentTopics('#actived_topics');
const addTopic = useAddTopic('#add_topics');
const removeTopic = useRemoveTopics('#remove_topics');

/** app entry */
window.onload = function init() {
  /** fetch Topics and render them. */
  (async () => {
    await topicService.fetchTopics();
    currentTopics.render();
  })();

  /** render locale select */
  localeSelect.render();

  /** When change actived topics */
  e.addEventListener(e.ON_TOPICS_ACTIVE_CHANGE, () => {
    removeTopic.render();
    addTopic.render();
    currentTopics.render();
  });

  /** When changing locale */
  e.addEventListener(e.ON_LOCALE_CHANGE, renderNewsHandler);

  /** When changing current topic */
  e.addEventListener(e.ON_TOPIC_CHANGE, renderNewsHandler);
};

/**  */
async function renderNewsHandler() {
  // clean news list
  newsList.clean();
  // news header
  newsHeader.render();
  // show loading UI
  const stopLoading = newsList.showLoading();

  try {
    // fetch news
    const res = await newsService.fetchNews();
    // do nothing if there no data return or a failed response.
    if (!res) {
      return;
    }

    const json = await res.json();

    newsList.render(json.data);
  } finally {
    stopLoading();
  }
}

/**
 * To display/hidden "Add Topic" area
 */
function triggerAddTopicSection() {
  removeTopic.hide();
  addTopic.trigger();
}

/**
 * To display/hidden "Remove Topic" area
 */
function triggerRemoveTopicSection() {
  addTopic.hide();
  removeTopic.trigger();
}

/**
 * To add selecte d topics
 */
async function addCheckedTopics() {
  await addTopic.submit();
  e.dispatchEvent(e.ON_TOPICS_ACTIVE_CHANGE);
}

/**
 * To remove selected topics
 */
async function removeCheckedTopics() {
  await removeTopic.submit();
  e.dispatchEvent(e.ON_TOPICS_ACTIVE_CHANGE);
}

/** for global accessing */
window.triggerAddTopicSection = triggerAddTopicSection;
window.triggerRemoveTopicSection = triggerRemoveTopicSection;
window.addCheckedTopics = addCheckedTopics;
window.removeCheckedTopics = removeCheckedTopics;
