/* eslint-disable */
const removeUrlParams = name => {
  var query = window.location.search.substr(1);
  if (query.indexOf(name) > -1) {
    var obj = {};
    var arr = query.split("&");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];
    var url = JSON.stringify(obj)
      .replace(/[\"\{\}]/g, "")
      .replace(/\:/g, "=")
      .replace(/\,/g, "&");
    var http = "https:" == document.location.protocol ? "https://" : "http://";
    window.history.replaceState(
      {},
      0,
      http + window.location.host + window.location.pathname + "?" + url
    );
  }
};

const getLanguage = () => {
  let acceptableLang = [
    "ar",
    "en",
    "es",
    "fr",
    "id",
    "pt",
    "ru",
    "th",
    "tr",
    "vi",
    "zh",
    "ko",
    "ja",
    "ar",
    "de",
    "jv",
    "ms"
  ];
  let query = window.location.search.substring(1);
  let lang, vars;
  if (query) {
    vars = query.split("&");
    lang = vars[0].split("=")[1];
  }

  if (lang) {
    return lang;
  } else {
    lang = (navigator.language || navigator.browserLanguage).toLowerCase();
    for (var i = 0; i < acceptableLang.length; i++) {
      acceptableLang[i] = acceptableLang[i].toLowerCase();
      if (lang === acceptableLang[i]) {
        return lang;
      } else if (lang === "zh-tw") {
        return "zh";
      }
    }
    return "en";
  }
};

const getCookie = name => {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const getTime = (time, config) => {
  if (!config) config = "UTC";
  if (config === "UTC") {
    return new Date(time * 1000);
  }
};
// 用户信息存储
const getAndStoreParams = lang => {
  let query = window.location.search.substring(1);
  let vars, access_token;
  if (query) {
    vars = query.split("&");
    if (vars[1]) {
      access_token = vars[1].split("=")[1];
    }
  }

  if (!access_token) {
    access_token = window.sessionStorage.getItem("AccessToken") || "";
  }
  access_token && window.sessionStorage.setItem("AccessToken", access_token);
  lang && window.sessionStorage.setItem("Lang", lang);
  return access_token;
};
export default {
  getLanguage,
  getCookie,
  removeUrlParams,
  getTime,
  getAndStoreParams
};
