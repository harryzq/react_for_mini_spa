import React, { useMemo } from "react";
// import Language from './../../features/Language';

export default function PleaseRoate(props) {
  return useMemo(
    () => (
      <div className="wp_pop">
        <div className="wp_content">
          <div className="wp_pop_img"></div>
          <p className="wp_tips">
            Please rotate your phone for the best browsing experience
          </p>
        </div>
      </div>
    ),
    []
  );
}
