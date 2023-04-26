import React from "react";
import { BsArrowRight } from "react-icons/bs";
const Title = ({ isIcon, title }) => {
  return (
    <div className="flex items-center mb-5 mt-5 pl-10">
      {isIcon ? (
        <div className="mr-5">
          <BsArrowRight size={55} />
        </div>
      ) : null}
      <h4 className="text-40 font-semibold uppercase border-b-4 border-color_yellow">
        {title}
      </h4>
    </div>
  );
};

export default Title;
