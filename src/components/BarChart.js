import letterFrequency from "@visx/mock-data/lib/mocks/letterFrequency";
import { NodeGroup } from "react-move";
import { scaleLinear, scaleBand } from "@visx/scale";
import { useState } from "react";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
// const data = [{letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }]

const data = letterFrequency,
  margin = {
    left: 30,
    right: 20,
    top: 20,
    bottom: 20
  },
  width = 300,
  height = 600,
  innerWidth = width - margin.left - margin.right,
  innerHeight = height - margin.top - margin.bottom,
  x = (d) => d.letter,
  y = (d) => d.frequency * 1000;

const yScale = scaleLinear({
  range: [innerHeight, 0],
  domain: [0, Math.max(...data.map(y))],
  nice: true,
  round: true
});
const BarChart = (props) => {
  const { x, y, height, width, fill, opacity } = props.state;
  return (
    <Group key={props.key}>
      <Bar
        x={x}
        y={y}
        height={height}
        width={width}
        fill={fill}
        onMouseOver={props.onMouseOver}
        onMouseOut={props.onMouseOut}
        opacity={opacity}
      />
    </Group>
  );
};

const TransitionBarChart = () => {
  //const [showData, setShowData] = useState(data.slice(0, 5));
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip
  } = useTooltip();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true
  });
  const [index, setIndex] = useState(5);
  const [preindex, setPreIndex] = useState(0);
  const [newData, setNewData] = useState(data.slice(0, 5));

  console.log(index);

  //setShowData(data.slice(Math.max(index-5, 0), index))

  const onNext = () => {
    setIndex((index) => Math.min(index + 5, 26));
  };

  const onPrev = () => {
    //setPreIndex(Math.max(0, index-10))
    setIndex(Math.max(index - 5, 5));
    //setShowData(data.slice(Math.max(index-5, 0), index))
  };

  const showData = data.slice(Math.max(index - 5, 0), index);
  const xScale = scaleBand({
    range: [margin.left, innerWidth + margin.left],
    domain: showData.map((d) => d.letter),
    padding: 0.1,
    nice: true
  });

  // const yScale = scaleLinear({
  //     range: [innerHeight, 0],
  //     domain: [0, Math.max(...data.map(y))],
  //     nice: true,
  //     round: true
  // })

  return (
    <>
      <div>
        <button onClick={onPrev}>Prev</button>
        <svg ref={containerRef} width={width} height={height}>
          <Group top={15}>
            <NodeGroup
              data={showData}
              keyAccessor={(d) => d.letter}
              start={(data, index) => ({
                opacity: [0.8],
                fill: "green",
                width: xScale.bandwidth(),
                x: [
                  width + width - (4 - index) * xScale.bandwidth() + index * 5
                ],
                // x: [width+index*xScale.bandwidth()],
                y: [yScale(y(data))],
                height: [innerHeight - yScale(y(data))]
              })}
              enter={(data, index) => ({
                //value: data.frequency,
                width: xScale.bandwidth(),
                x: [xScale(x(data))],
                y: [yScale(y(data))],
                height: [innerHeight - yScale(y(data))],
                timing: { duration: 200 }
              })}
              update={(data, index) => ({
                // value: data.frequency,
                width: xScale.bandwidth(),
                x: [xScale(x(data))],
                y: [yScale(y(data))],
                height: [innerHeight - yScale(y(data))],
                timing: { duration: 200 }
              })}
              leave={(data, index) => ({
                opacity: [0],
                x: [-300],
                value: [data.frequency],
                // timing: {duration: 200*index, delay: 10*index}
                timing: { duration: 250 }
              })}
              // update={this.updateTransition}
              // leave={this.leaveTransition}
            >
              {(nodes) => (
                <g>
                  {nodes.map(({ key, data, state }) => {
                    console.log(nodes);
                    return (
                      <BarChart
                        // fill='#4682b4'
                        onMouseOver={() => {
                          showTooltip({
                            tooltipLeft: xScale(x(data)) + 10,
                            tooltipTop: yScale(y(data)) + 10,
                            tooltipData: `${x(data)}: ${y(data)}`
                          });
                        }}
                        state={state}
                        key={key}
                        onMouseOut={hideTooltip}
                      />
                    );
                  })}
                </g>
              )}
            </NodeGroup>
            <AxisLeft
              left={margin.left}
              scale={yScale}
              hideAxisLine
              hideTicks
              rangePadding={5}
            />
            <AxisBottom
              top={innerHeight}
              scale={xScale}
              hideAxisLine
              hideTicks
              rangePadding={5}
              numTicks={26}
            />
          </Group>
        </svg>
        {tooltipOpen && (
          <TooltipInPortal
            // set this to random so it correctly updates with parent bounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
          >
            <strong>{tooltipData}</strong>
          </TooltipInPortal>
        )}
        <button onClick={onNext}>Next</button>
      </div>
    </>
  );
};

export default TransitionBarChart;
