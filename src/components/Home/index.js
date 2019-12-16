import React, { useState, useEffect } from "react";
import utils from "./utils";
import Modal from "react-responsive-modal";
import axios from "axios";
import Slider from "react-slick";
import API from "./api";
import { NextArrow, PrevArrow } from "./components/SliderArrow";
import "./css/App.scss";
//axios默认配置
axios.defaults.withCredentials = true;
axios.defaults.timeout = 15000; //超时响应
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"; // 配置请求头（推荐）

function App() {
  // 弹窗遮罩控制
  const [modalOpen, setModalOpen] = useState(false);

  const onCloseModal = () => {
    setModalOpen(false);
  };
  const onOpenModal = () => {
    setModalOpen(true);
  };

  // 初始化数据
  const [lang] = useState(utils.getLanguage());
  const [accessToken] = useState(utils.getAndStoreParams(lang));

  useEffect(() => {
    // 语言设置
    document.getElementsByTagName("html")[0].setAttribute("lang", lang);
  });

  // 获取用户数据
  const [initInfo, setInitInfo] = useState(null);

  useEffect(() => {
    const getInitInfo = (accessToken, lang) => {
      //axios X-CSRFToken配置
      axios.defaults.headers.post["X-CSRFToken"] =
        utils.getCookie("csrftoken") || "csrftoken";
      // 请求数据
      axios
        .get(API.userinfo, {
          params: {
            accessToken,
            lang
          }
        })
        .then((res, rej) => {
          if (!res) return;
          setInitInfo(res.data.data);
        })
        .catch(error => {
          onOpenModal(error);
        });
    };
    getInitInfo(accessToken, lang);
  }, [accessToken, lang]);

  // slider 配置
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  return (
    <div className="App">
      <Modal open={modalOpen} onClose={onCloseModal} center>
        <h2>Simple {JSON.stringify(initInfo)}</h2>
      </Modal>

      <Slider {...sliderSettings}>
        <div className="slider-img-warp "></div>
        <div className="slider-img-warp slider1"></div>
        <div className="slider-img-warp slider2"></div>
      </Slider>
    </div>
  );
}

export default App;
