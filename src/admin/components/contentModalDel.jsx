import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";


// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

function contentModalDel({content}) {
  return (
    <>
      <div className="mt-2 text-center">
        <lord-icon
          src="https://cdn.lordicon.com/gsqxdxog.json"
          trigger="loop"
          colors="primary:#f7b84b,secondary:#f06548"
          style={{ width: "100px", height: "100px" }}
        ></lord-icon>
        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">{content}</div>
      </div>
    </>
  );
}

export default contentModalDel;
