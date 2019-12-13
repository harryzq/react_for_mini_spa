import React, { useState, useEffect } from "react";
import "./css/App.scss";
import utils from "./utils";
import Modal from "react-responsive-modal";
import axios from "axios";
// headers: {
//   'X-CSRFToken': utils.getCookie('csrftoken')
// }
function App() {
  // 初始化数据
  const [lang, setLang] = useState(utils.getLanguage());
  const [accessToken, setAccessToken] = useState(utils.getAndStoreParams(lang));
  useEffect(() => {
    // 语言设置
    document.getElementsByTagName("html")[0].setAttribute("lang", lang);
  });

  // 获取用户数据
  const [iniInfo, setInitInfo] = useState({});
  const getInitInfo = (accessToken,lang) => {
    const http = axios.create({
      //创建axios实例，在这里可以设置请求的默认配置
      timeout: 10000,
      withCredentials: true
    });
    http.defaults.headers.post["X-CSRFToken"] =
      utils.getCookie("csrftoken") || "csrftoken";
    http.post("http://119.28.12.109:3100/mock/56/api/spin").then((res, rej) => {
      setInitInfo(value=>({
        ...value,
        data:res.data.rewards
      }))
      
    });
  };
  useEffect(() => {
    getInitInfo(accessToken,lang)
  },[]);

  const [modalOpen, setModalOpen] = useState(false);
  // modal控制
  const onCloseModal = () => {
    setModalOpen(false);
  };
  const onOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="App">
      <button onClick={onOpenModal}>Open modal</button>
      <Modal open={modalOpen} onClose={onCloseModal} center>
        <h2>Simple {iniInfo} modal</h2>
      </Modal>
    </div>
  );
}

export default App;
