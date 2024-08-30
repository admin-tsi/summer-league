import React from "react";

type AnimatedGenderIconProps = {
  isGirls: boolean;
};

export const AnimatedGenderIcon: React.FC<AnimatedGenderIconProps> = ({
  isGirls,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="80"
      viewBox="0 0 50 80"
      fill="none"
      className="w-4"
    >
      <path
        d="M25 46.875C37.0812 46.875 46.875 37.0812 46.875 25C46.875 12.9188 37.0812 3.125 25 3.125C12.9188 3.125 3.125 12.9188 3.125 25C3.125 37.0812 12.9188 46.875 25 46.875Z"
        stroke="black"
        stroke-width="6"
      />
      <path d="M28.75 46.5H21.5V74.25H28.75V46.5Z" fill="black" />
      <path
        d="M28.75 71.5H21.5V49H28.75V71.5Z"
        fill="black"
        id="branch-1"
        style={{
          animation: isGirls
            ? "to-girl1 1.6s cubic-bezier(0.39, 0.575, 0.565, 1) 1.4s both;"
            : "to-boy1 1.6s cubic-bezier(0.39, 0.575, 0.565, 1) 1.4s both;",
        }}
      />
      <path
        d="M28.75 49H21.5V71.5H28.75V49Z"
        fill="black"
        id="branch-2"
        style={{
          animation: isGirls
            ? "to-girl2 1.6s cubic-bezier(0.39, 0.575, 0.565, 1) 1.4s both;"
            : "to-boy2 1.6s cubic-bezier(0.39, 0.575, 0.565, 1) 1.4s both;",
        }}
      />
    </svg>
  );
};
