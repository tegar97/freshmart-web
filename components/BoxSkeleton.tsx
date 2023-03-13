import React from "react";

function BoxSkeleton({ height, width, borderRadius } : {height: string, width: string, borderRadius: string}) {
  return (
    <div
      className="bg-gray-200 animate-pulse"
      style={{
        height: height,
        width: width,
        borderRadius: borderRadius,
      }}
    ></div>
  );
}

export default BoxSkeleton;
