import React from "react";

export const Thumb = (props) => {
  const { selected,image, index, onClick } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <img
          className="h-full w-full object-cover"
          src={image.secure_url || "/images/image.png"}
          alt=""
        />
      </button>
    </div>
  );
};
