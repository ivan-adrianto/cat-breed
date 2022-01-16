import React from "react";

function LoadingSpinner({ wrapper }) {
  return (
    <div className={wrapper} >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
