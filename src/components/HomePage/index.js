import React, { useContext, useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import axios from "axios";
import Slider from "react-slick";
import { AppContext } from "../../App";
import utils from "../../utils";
import API from "../../api";
import { UPDATE_USERINFO } from "../../reducer";
import { NextArrow, PrevArrow } from "../SliderArrow";
import Loading from '../Loading'
import Dialog from '../Dialog'
import Message from '../Message'
function HomePage() {
  // 弹窗遮罩控制
  const [modalOpen, setModalOpen] = useState(false);

  const onCloseModal = () => {
    setModalOpen(false);
  };
  const onOpenModal = () => {
    setModalOpen(true);
  };
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

  // 获取全局state
  const { state, dispatch } = useContext(AppContext);
  function handleDialog(){
    Message({
      isShow:true,
      content:'hahah'
    })
  }
  // 获取用户数据
  useEffect(() => {
    const getInitInfo = (accessToken, lang) => {
      //axios X-CSRFToken配置
      axios.defaults.headers.post["X-CSRFToken"] =
        utils.getCookie("csrftoken") || "csrftoken";
      // 请求数据
      axios
        .post(API.userinfo, {
          accessToken,
          lang
        })
        .then((res, rej) => {
          handleDialog()
          if (!res) return;
          dispatch({
            type: UPDATE_USERINFO,
            payload: res.data.data
          });
        })
        .catch(error => {
          console.log(error)
          onOpenModal(error);
        });
    };
    getInitInfo(state.accessToken, state.lang);
  }, [dispatch, state.accessToken, state.lang]);

  // 渲染dom
  return (
    <div className="home-page">
      <Modal open={modalOpen} onClose={onCloseModal} center>
        <h2>Simple</h2>
      </Modal>
      
      {state.userInfo ? (
        <Slider {...sliderSettings}>
          <div className="slider-img-warp " onClick={handleDialog}> {JSON.stringify(state)} </div>
          <div className="slider-img-warp slider1"></div>
          <div className="slider-img-warp slider2"></div>
        </Slider>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
}
export default HomePage;
