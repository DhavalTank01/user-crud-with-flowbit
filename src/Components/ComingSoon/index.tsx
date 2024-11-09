import React from "react";

const ComingSoon = ({ title }: { title?: string }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {title && <h2 className="text-2xl">{title}</h2>}
      <h3 className="text-sm">Coming Soon...</h3>
    </div>
  );
};

export default ComingSoon;
