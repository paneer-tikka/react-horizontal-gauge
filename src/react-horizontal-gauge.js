import React from 'react'

const defaultProps = {
  width: 500,
  height: 80,
  value: 0,
  max: 100,
  min: 0,
  box: { x1: "2%", x2: "96%", y1: "30%", y2: "40%", widthK: 0.96 },
  axis: { x1: "2%", x2: "98%", y1: "20%", y2: "80%", widthK: 0.98 },
  ticks: [{label: '0', value: 0}, {label: '50', value: 50}, {label: '100', value: 100}]
}

export default (props) => {

  props = {
    ...defaultProps,
    ...props
  };

  function calcAxisPos(val) {
    if(props.min === val) {
      return props.axis.x1;
    } else if (props.max === val) {
      return props.axis.x2;
    } else {
      return (val-props.min) * (props.width * props.axis.widthK)/(props.max-props.min);
    }
  }

  return (
    <svg width={props.width} height={props.height}>
      <defs>
        <linearGradient id="gradient" x1={props.box.x1} y1={props.box.y1} x2={props.box.x2} y2={props.box.y1} spreadMethod="pad">
          <stop offset="0%" stopColor="red" stopOpacity="1"></stop>
          <stop offset="50%" stopColor="yellow" stopOpacity="1"></stop>
          <stop offset="100%" stopColor="green" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <g>
        <rect x={props.box.x1} y={props.box.y1} width={props.box.x2} height={props.box.y2} fill="url(#gradient)"></rect>
      </g>
      <g>
        <text textAnchor="middle" x={calcAxisPos(props.value)} y={props.axis.y1} fontSize="12" fill="#003e6f">
          {props.value}
        </text>
      </g>
      <g>
        {
          props.ticks.map((item) => {
            return (
              <line y1={props.axis.y1} x1={calcAxisPos(item.value)} y2={props.axis.y2} x2={calcAxisPos(item.value)} strokeWidth="2" stroke="#fff"></line>
            )
          })
        }
      </g>
      <g>
        <line y1={props.box.y1} x1={calcAxisPos(props.value)} y2={"70%"} x2={calcAxisPos(props.value)} strokeWidth="1" stroke="#003e6f"></line>
      </g>
      <g>
        <polygon points={
          (calcAxisPos(props.value) - 4) + "," + props.height * 0.30 + " " +
          calcAxisPos(props.value) + "," + props.height * 0.4 + " " +
          (calcAxisPos(props.value) + 4) + "," + props.height * 0.30
        } fill="#003e6f" stroke="purple" stroke-width="5" />
      </g>
      <g>{
        props.ticks.map((item) => {
          return (
            <text textAnchor="middle" x={calcAxisPos(item.value)} y={props.height} fontSize="12" fill="#003e6f">
              {item.label}
            </text>
          )
        })
      }
      </g>
    </svg>
  );
}