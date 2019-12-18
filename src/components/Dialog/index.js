import React, { useState, useEffect } from "react";

export default function Dialog(props) {
  /**
   * isShow 控制显示与否
   * onClose 关闭时回调
   * noCloseIcon 是否关闭关闭图标
   * delayClose 延迟关闭弹窗
   */
  const { isShow, onClose, noCloseIcon, delayClose } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => {
    onClose && onClose();
    setShow(false);
  };
  useEffect(() => {
    if (isShow) {
      setShow(isShow);
    }
  }, [isShow]);
//   延迟关闭
  useEffect(() => {
    if (delayClose) {
      let _delayClose = setTimeout(() => {
        handleClose();
      }, delayClose);
      return () => {
        clearTimeout(_delayClose);
      };
    }
  }, [delayClose]);

  return (
    <div className="ga-dialog" className={show ? "show" : "hidden"}>
      <div className="dialog outter-dialog common-dialog fadeInUp animated ">
        <div className="warp">
          {noCloseIcon ? null : (
            <div className="close">
              <i onClick={handleClose} className="icon-cross">
                X
              </i>
            </div>
          )}
          <div className="content">{props.children}</div>
        </div>
      </div>
      <div className="mask rule-mask "></div>
    </div>
  );
}
