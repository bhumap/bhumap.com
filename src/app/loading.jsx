import React from 'react'

const loading = () => {
  return (
    <div>
        <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          width="88"
          height="88"
          viewBox="0 0 88 88"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#f7a31c"
        >
          <g fill="none" fillRule="evenodd" strokeWidth="2">
            <circle cx="44" cy="44" r="1">
              <animate
                attributeName="r"
                begin="0s"
                dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                begin="0s"
                dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="44" cy="44" r="1">
              <animate
                attributeName="r"
                begin="-0.9s"
                dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                begin="-0.9s"
                dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default loading