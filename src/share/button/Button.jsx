import React from "react";

const Button = ({ text, height, fontsize, type, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        className={`relative ${height}  min-w-fit px-3 bg-color_yellow text-black  uppercase font-semibold ${fontsize} before:absolute before:content-[''] before:w-full before:h-full before:top-1 before:left-1 before:border before:border-black hover:text-opacity-75 duration-75 transition-opacity`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
