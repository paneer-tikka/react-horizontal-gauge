import React  from "react";
import HorizontalGauge from "./react-horizontal-gauge";

export default () => {

  const gaugeTicks = [
    {label: '0', value: 0},
    {label: '2', value: 2},
    {label: '4', value: 4},
    {label: '6', value: 6},
    {label: '8', value: 8},
    {label: '10', value: 10},
  ];

	return (
		<div className="examples">
			<h1>
				react-linear-gauge example
			</h1>
			<div className="example">
				<HorizontalGauge ticks={gaugeTicks} height={70} width={500} min={0} max={10} value={7.3} />
			</div>
		</div>
	)
}
