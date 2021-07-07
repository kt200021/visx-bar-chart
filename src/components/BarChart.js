import letterFrequency from '@visx/mock-data/lib/mocks/letterFrequency';
import { NodeGroup } from 'react-move';
import { scaleLinear, scaleBand } from '@visx/scale';
import { useState } from 'react';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { useTooltip, useTooltipInPortal, TooltipWithBounds } from '@visx/tooltip';
// const data = [{letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }, {letter: , val: }]

const data = letterFrequency,
    margin = {
        left: 30,
        right: 20,
        top: 20,
        bottom: 20 
    },
    width = 800,
    height = 600,
    innerWidth = width - margin.left - margin.right,
    innerHeight = height - margin.top - margin.bottom,
    x = (d) => d.letter,
    y = (d) => d.frequency * 1000


const BarChart = () => {

    //const [showData, setShowData] = useState(data.slice(0, 5));
    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
      } = useTooltip();

      const { containerRef, TooltipInPortal } = useTooltipInPortal({
          detectBounds: true,
          scroll: true
      })
    const [index, setIndex] = useState(5);

    console.log(index)
    
    // setShowData(data.slice(Math.max(index-5, 0), index))

    const onNext = () => {
        setIndex(index => Math.min(index+5, 26));
        //setShowData(data.slice(Math.max(index-5, 0), index))
    }

    const onPrev = () => {
        setIndex(Math.max(index-5, 5));
        //setShowData(data.slice(Math.max(index-5, 0), index))
    }


    const showData = data.slice(Math.max(index-5, 0), index)
    const xScale = scaleBand({
        range: [margin.left, innerWidth+margin.left],
        domain: showData.map(d => d.letter),
        padding: 0.1,
        nice: true
    })
    
    const yScale = scaleLinear({
        range: [innerHeight, 0],
        domain: [0, Math.max(...data.map(y))],
        nice: true,
        round: true
    })

    return(
        <>
            <div>
            <button onClick={onPrev}>Prev</button>
                <svg ref={containerRef} width={width} height={height}>
                    <Group top={15}>
                        <NodeGroup
                            data={showData}
                            keyAccessor={d => d.letter}
                            start={(data, index) => ({
                                opacity: 1e-6,
                                fill: 'green',
                                width: xScale.bandwidth(),
                              })}
                            // start={this.startTransition}
                            // enter={this.enterTransition}
                            // update={this.updateTransition}
                            // leave={this.leaveTransition}
                        >
                        {
                            showData.map((d, i) => {
                                // const tinckValue = data.map((d, i) => {
                                //     return 
                                // })
                                return(
                                    <Group key={`bar-${i}`}>
                                        <Bar
                                            x={xScale(x(d))}
                                            y={yScale(y(d))}
                                            height={innerHeight - yScale(y(d))}
                                            // width={xScale.bandwidth()}
                                            // fill='#4682b4'
                                            onMouseOver={() => {
                                                showTooltip({
                                                    tooltipLeft: xScale(x(d)) + 10,
                                                    tooltipTop: yScale(y(d)) + 10,
                                                    tooltipData: `${x(d)}: ${y(d)}` 
                                                });
                                            }}
                                            onMouseOut={hideTooltip}
                                        />
                                    </Group>
                                )
                            })
                        }

                        <AxisLeft 
                            left={margin.left}
                            scale={yScale}
                            hideAxisLine
                            hideTicks
                            rangePadding = {5}
                            
                        />
                        <AxisBottom 
                            top={innerHeight}
                            scale={xScale}
                            hideAxisLine
                            hideTicks
                            rangePadding = {5}
                            numTicks = {26}
                        />
                        </NodeGroup>
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
    )
}

export default BarChart;