import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      style={{ zIndex: "999999999" }}
      className="flex w-screen h-screen left-0 top-0 fixed items-center justify-center min-h-screen bg-gray-500 opacity-40"
    >
      <div className="flex flex-col">
        <div className="flex space-x-24">
          <div className="container space-y-10 relative">
            <div className="flex flex-col">
              <div className="flex flex-row space-x-4">
                <div
                  className="w-12 h-12 rounded-full animate-spin
                        border-8 border-solid border-yellow-500 border-t-transparent"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
