import React from "react";

const Draggable = ({ children }) => {
  let offsetX = 0;
  let offsetY = 0;

  const handleGrab = (event) => {
    const eventTarget = event.currentTarget;
    offsetX = event.pageX - eventTarget.offsetLeft;
    offsetY = event.pageY - eventTarget.offsetTop;
    eventTarget.addEventListener("mousemove", handleDrag);
  };

  const handleDrag = (event) => {
    const eventTarget = event.currentTarget;
    const boxWidth = event.target.getBoundingClientRect().width;
    const boxHeight = event.target.getBoundingClientRect().height;

    let diffX = 0;
    let diffY = 0;

    // check x range constraint
    if (event.pageX - offsetX < 0) diffX = 0;
    else if (event.pageX - offsetX + boxWidth > window.innerWidth)
      diffX = window.innerWidth - boxWidth;
    else diffX = event.pageX - offsetX;

    // check y range constraint
    if (event.pageY - offsetY < 0) diffY = 0;
    else if (event.pageY - offsetY + boxHeight > window.innerHeight)
      diffY = window.innerHeight - boxHeight;
    else diffY = event.pageY - offsetY;

    eventTarget.style.left = `${diffX}px`;
    eventTarget.style.top = `${diffY}px`;
    eventTarget.style.width = `${boxHeight}px`;
    eventTarget.style.height = `${boxHeight}px`;
  };

  const handleDrop = (event) => {
    const eventTarget = event.currentTarget;
    eventTarget.removeEventListener("mousemove", handleDrag);
  };

  return (
    <div
      style={{
        position: "relative",
        cursor: "move",
      }}
      onMouseDown={handleGrab}
      onMouseUp={handleDrop}
      onMouseOut={handleDrop}
    >
      {children}
    </div>
  );
};

export default Draggable;
