import React, { createContext, useReducer, useEffect } from "react";
import utils from "./utils";
import HomePage from "./components/HomePage";
import { reducer } from "./reducer";
import axios from "axios";
import './css/App.scss'
import PleaseRoate from './components/PleaseRoate'
//axios默认配置
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000; //超时响应
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"; // 配置请求头

//axios X-CSRFToken配置
axios.defaults.headers.post["X-CSRFToken"] =
utils.getCookie("csrftoken") || "csrftoken";

// 初始化参数
const lang = utils.getLanguage();
const accessToken = utils.getAndStoreParams(lang);

export const AppContext = createContext(null);
const initalState = {
  lang: lang,
  accessToken: accessToken,
  userInfo: null
};

function App() {
  const [state, dispatch] = useReducer(reducer, initalState);
  // 语言设置
  useEffect(() => {
    document.getElementsByTagName("html")[0].setAttribute("lang", lang);
  });

  return (
    <AppContext.Provider value={{ state, dispatch: dispatch }}>
      <PleaseRoate></PleaseRoate>
      <HomePage></HomePage>
    </AppContext.Provider>
  );
}

export default App;
