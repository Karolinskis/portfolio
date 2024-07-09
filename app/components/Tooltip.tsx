import React, { useState } from "react";

const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}

      <div
        className={`absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 ${
          showTooltip ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ transition: "opacity 0.2s" }}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
