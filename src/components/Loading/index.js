import React, { useMemo } from "react";
import loading from "../../images/loading.svg";

export default function Loading() {
  return useMemo(
    () => (
      <div className="ga-loading">
        <div className="mask rule-mask loading-mask"></div>
        <img src={loading} alt="loading..."></img>
      </div>
    ),
    []
  );
}
