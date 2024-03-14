/**
 * Avliable locals and it's general name
 * 
 * @type {Record<string, string>}
 */
const localeDictionary = {
  "us": "United States (US)",
  "au": "Australia (AU)",
  "nz": "New Zealand (NZ)",
  "gb": "United Kingdom (GB)"
}

/**
 * News service
 */
{
  let locale = "nz";

  function useNewsService() {
    function fetchNews() {
      const url = new URL(location.origin);
      url.pathname = "/fetchNews.php";
      url.search = new URLSearchParams({ locale }).toString();
  
      fetch(url)
    }
  
    return {
      fetchNews
    } 
  }

  function fetchNewsFromPHP() {
    const s = useNewsService();

    s.fetchNews();
  }

  /**
   * Fetch data from thenewsapi.com
   */
  function fetchTheNewsApi() {
    const params = {
      // fixed language
      language: "en",
      // selected locale
      locale,
      // 
      api_token: "SuU2Gmc4j23OvBVoIGtbm5faaJPwMBbQiG2hOyaH"
    }

    const url = new URL("https://api.thenewsapi.com/v1/news/headlines")
    url.search = new URLSearchParams(params).toString();

    return fetch(url, {
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, same-origin, *omit
      headers: { "content-type": "application/json", },
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // *client, no-referrer
    })
  }
}

/** 
 * Locale Select Renderer
 */
function uselocaleSelect(appendTo) {
  let currentLocale = "nz";
  const newsService = useNewsService();

  function render () {
    const parent = document.querySelector(appendTo)
    const select = document.createElement("select");
    
    emptyElement(parent).appendChild(select);

    select.addEventListener('change', () => {
      newsService.fetchNews();
    });

    Object.entries(localeDictionary).forEach(([locale, generalName]) => {
      const option = document.createElement("option");

      option.innerHTML = generalName;
      option.setAttribute('value', locale);
      if (currentLocale === locale) {
        option.setAttribute('selected', 'selected');
      }
      
      select.appendChild(option);
    })
  }

  return {
    render
  }
}