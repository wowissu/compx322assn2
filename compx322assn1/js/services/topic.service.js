/**
 * @typedef {Object} Topic
 * @property {number} id
 * @property {string} topic
 * @property {number} active 1 or 0
 */

import { useEvent } from '../event.js';
import { useScope } from '../util.js';

/**
 * Handling Topics data
 */
export const useTopicService = useScope(function () {
  const e = useEvent();

  /**
   * active topic
   * @type {Topic[]}
   */
  let topics = [];

  /**
   * current topic
   * @type {Topic|null}
   */
  let currentTopic = null;

  function fetchTopics() {
    return fetch('./fetchTopics.php').then((res) => {
      return res
        .json()
        .then((rawData) => parse(rawData))
        .then((data) => {
          topics = data;
          return res;
        });
    });
  }

  function updateActiveTopics(topic_ids) {
    /** @type {RequestInit} */
    const fetchRequestInit = {
      method: 'post',
      body: JSON.stringify(topic_ids),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return fetch('./updateActiveTopics.php', fetchRequestInit);
  }

  function updateInactiveTopics(topic_ids) {
    /** @type {RequestInit} */
    const fetchRequestInit = {
      method: 'post',
      body: JSON.stringify(topic_ids),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return fetch('./updateInactiveTopics.php', fetchRequestInit);
  }

  /**
   * Get actived topics
   * @returns {Topic[]}
   */
  function getActivedTopics() {
    return topics.filter((t) => t.active === '1');
  }

  /**
   * Get inactvied topics
   * @returns {Topic[]}
   */
  function getInactivedTopics() {
    return topics.filter((t) => t.active === '0');
  }

  function parse(responseData) {
    if (responseData.status !== 'ok') {
      throw new Error('response error');
    }

    return responseData.data;
  }

  /**
   * Get the list of all topics
   */
  function getTopics() {
    return topics;
  }

  /**
   * set current topic
   * @param {Topic} topic
   */
  function setCurrentTopic(topic, dispath = true) {
    currentTopic = topic;

    if (dispath) {
      e.dispatchEvent(e.ON_TOPIC_CHANGE, currentTopic);
    }
  }

  /**
   * Get current topic, if currentTopic is null
   * Could be changed by setCurrentTopic(topic)
   * @return {typeof currentTopic}
   */
  function getCurrentTopic() {
    return currentTopic;
  }

  return () => ({
    setCurrentTopic,
    getCurrentTopic,
    getTopics,
    fetchTopics,
    updateActiveTopics,
    updateInactiveTopics,
    getActivedTopics,
    getInactivedTopics,
  });
});
