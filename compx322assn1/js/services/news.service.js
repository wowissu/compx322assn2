import { useScope } from '../util.js';
import { useLocaleService } from './locale.service.js';
import { useTopicService } from './topic.service.js';

/**
 * News service
 */

/**
 * @typedef {Object} News
 * @property {string} title
 * @property {string} description
 * @property {string} url
 */

export const useNewsService = useScope(() => {
  const ls = useLocaleService();
  const ts = useTopicService();
  const apiUrl = 'https://api.thenewsapi.com/v1/news/top';
  const apiToken = 'SuU2Gmc4j23OvBVoIGtbm5faaJPwMBbQiG2hOyaH';

  /**
   * Fetch data from thenewsapi.com
   * @return {Promise<Response|undefined>}
   */
  async function fetchNews() {
    // return mockFetch();

    const currentTopic = ts.getCurrentTopic();
    const currentLocale = ls.getCurrentLocale();

    if (currentTopic === null || !currentLocale) {
      return;
    }

    const params = {
      // fixed language
      language: 'en',
      // selected locale
      locale: currentLocale,
      // topic
      categories: currentTopic.topic,
      //
      api_token: apiToken,
    };

    const url = new URL(apiUrl);
    url.search = new URLSearchParams(params).toString();

    return fetch(url, {
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, same-origin, *omit
      headers: { 'content-type': 'application/json' },
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    });
  }

  return () => ({
    fetchNews,
  });
});

/** dev only - for mock fetch response */
async function mockFetch() {
  const data = {
    meta: {
      found: 73093,
      returned: 3,
      limit: 3,
      page: 1,
    },
    data: [
      {
        uuid: 'd27039b0-8aae-440a-ba29-43299a5ff955',
        title: 'Boy, 6, reported missing in south Auckland found safe',
        description: 'Anton was last seen at his Randwick Park home earlier today, police say.',
        keywords: 'Radio New Zealand, RNZ, Public Radio, News, Current Affairs, Audio, Podcasts',
        snippet: 'Photo: Supplied/ Counties Manukau Police\n\nA 6-year-old boy reported missing from his south Auckland home has been found safe, police say.\n\nCounties Manukau Poli...',
        url: 'https://www.rnz.co.nz/news/national/511971/boy-6-reported-missing-in-south-auckland-found-safe',
        image_url: 'https://media.rnztools.nz/rnz/image/upload/s--L6juxWi6--/t_tohu-badge-facebook/v1710658303/4KT5WXU_432013299_845617530942721_7279585981753364004_n_jpg',
        language: 'en',
        published_at: '2024-03-17T07:15:36.000000Z',
        source: 'rnz.co.nz',
        categories: ['general'],
        relevance_score: null,
        locale: 'nz',
      },
      {
        uuid: '739966ed-4a72-4f9c-a401-7234cf53f665',
        title: 'Good News: Stories that cheered us up for the week of 11-17 March',
        description: "Sick of doomscrolling? The healing power of cricket, a surfboard library and a Northland celebration of pride are just some of this week's feel-good stories, as...",
        keywords: 'Radio New Zealand, RNZ, Public Radio, News, Current Affairs, Audio, Podcasts',
        snippet: "Photo: RNZ\n\nThe healing power of cricket, a surfboard library and a Northland celebration of pride are just some of this week's feel-good stories, as seen on RN...",
        url: 'https://www.rnz.co.nz/news/national/511972/good-news-stories-that-cheered-us-up-for-the-week-of-11-17-march',
        image_url: 'https://media.rnztools.nz/rnz/image/upload/s--BEoEBtsh--/t_tohu-badge-facebook/v1706406824/4KVP1EH_280124_goodnews_1_jpg',
        language: 'en',
        published_at: '2024-03-17T07:12:32.000000Z',
        source: 'rnz.co.nz',
        categories: ['general'],
        relevance_score: null,
        locale: 'nz',
      },
      {
        uuid: '9302658e-f975-43da-826c-0df77d2bd786',
        title: "Russia's presidential vote starts final day with accusations of Kyiv sabotage",
        description: 'Russia started its final day of presidential voting with Moscow accusing Ukraine of using air attacks to try sabotage the election expected to keep President Vl...',
        keywords: 'Radio New Zealand, RNZ, Public Radio, News, Current Affairs, Audio, Podcasts',
        snippet: 'Photo: AFP\n\nBy Lidia Kelly, Reuters\n\nRussia started its final day of presidential voting on Sunday with Moscow accusing Ukraine of using air attacks to try to s...',
        url: 'https://www.rnz.co.nz/news/world/511973/russia-s-presidential-vote-starts-final-day-with-accusations-of-kyiv-sabotage',
        image_url: 'https://media.rnztools.nz/rnz/image/upload/s--gIcaiMb9--/t_tohu-badge-facebook/v1710658326/4KT5WXE_000_34LM686_jpg',
        language: 'en',
        published_at: '2024-03-17T07:12:32.000000Z',
        source: 'rnz.co.nz',
        categories: ['general'],
        relevance_score: null,
        locale: 'nz',
      },
    ],
  };

  return {
    async json() {
      return data;
    },
  };
}
