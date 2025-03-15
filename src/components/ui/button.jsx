import React from "react";

function Button({title, customClass}) {
  return<button className={`bg-blue-500 text-xs px-4 py-2 rounded-xl bg-primary hover:bg-primary-600 text-white transition ${customClass}`}>
  {title}
</button>;
}

export default Button;
