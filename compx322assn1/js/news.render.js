import { useTopicService } from './services/topic.service.js';
import { emptyElement } from './util.js';

/**
 * To render the news list.
 * @param {string|HTMLElement} appendTo
 */
export function useNewsListRender(appendTo) {
  function clean() {
    const ul = document.querySelector(appendTo);
    emptyElement(ul);
  }

  /**
   *
   * @param {import('./services/news.service.js').News[]} news
   */
  function render(news) {
    const ul = document.querySelector(appendTo);
    // clean
    clean();

    // if empty
    if (news.length === 0) {
      const li = document.createElement('li');
      li.classList.add('news_li');
      li.innerText = 'Sorry..., there no news in this topic right now.';
      ul.append(li);
      return;
    }

    ul.append(
      ...news.map((n) => {
        // create title
        const title = document.createElement('div');
        title.innerHTML = n.title;
        title.classList.add('news_title');

        // create url link
        const linkDiv = document.createElement('div');
        const linkA = document.createElement('a');
        linkA.setAttribute('href', n.url);
        linkA.setAttribute('target', '_blank');
        linkA.innerText = n.url;
        linkDiv.classList.add('news_url');
        linkDiv.append(linkA);

        // create li
        const li = document.createElement('li');
        li.classList.add('news_li');
        li.append(title, linkDiv);

        return li;
      })
    );
  }

  /**
   * show loading
   * @return {Function} clear loading
   */
  function showLoading() {
    const ul = document.querySelector(appendTo);
    const loadingSpan = document.createElement('span');

    loadingSpan.append('Loading...');
    ul.append(loadingSpan);

    return () => {
      ul.removeChild(loadingSpan);
    };
  }

  return {
    render,
    clean,
    showLoading,
  };
}

/**
 *
 * @param {string|HTMLElement} appendTo
 */
export function useNewsHeaderRender(appendTo) {
  const ts = useTopicService();

  /**
   * @param {import('./services/topic.service.js').Topic} topic
   */
  function render(topic) {
    topic = topic || ts.getCurrentTopic();

    const el = document.querySelector(appendTo);
    el.innerHTML = topic.topic;
  }

  return {
    render,
  };
}
