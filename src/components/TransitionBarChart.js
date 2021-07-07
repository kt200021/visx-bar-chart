import letterFrequency from '@visx/mock-data/lib/mocks/letterFrequency';
import { NodeGroup } from 'react-move';
import { scaleLinear, scaleBand } from '@visx/scale';
import { useState } from 'react';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { Text } from '@visx/text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Barchart.css'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useTooltip, useTooltipInPortal} from '@visx/tooltip';
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
    y = (d) => d.frequency * 1000

    const yScale = scaleLinear({
        range: [innerHeight, 0],
        domain: [0, Math.max(...data.map(y))],
        nice: true,
        round: true
    })
const BarChart = (props) => {
    const {x, y, height, width, fill, opacity} = props.state;
    return(
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
            
            {/* <AxisBottom 
                top={innerHeight}
                scale={props.scale}
                hideAxisLine
                hideTicks
                rangePadding = {5}
                numTicks = {26}
            /> */}
        </Group>
    )
}

const TransitionBarChart = () => {

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
    const [isbuttonPrev, setIsButtonPrev] = useState(false);
    // const [preindex, setPreIndex] = useState(0);
    // const [newData, setNewData] = useState(data.slice(0, 5))

    console.log(index)
    
    //setShowData(data.slice(Math.max(index-5, 0), index))

    const onNext = () => {
        
        setIndex(index => Math.min(index+5, 26));
        setIsButtonPrev(false);
    }

    const onPrev = () => {
        //setPreIndex(Math.max(0, index-10))
        setIndex(Math.max(index-5, 5));
        setIsButtonPrev(true);
        //setShowData(data.slice(Math.max(index-5, 0), index))
    }


    const showData = data.slice(Math.max(index-5, 0), index)
    const xScale = scaleBand({
        range: [margin.left, innerWidth+margin.left],
        domain: showData.map(d => d.letter),
        padding: 0.1,
        nice: true,
        
    })
    
    // const yScale = scaleLinear({
    //     range: [innerHeight, 0],
    //     domain: [0, Math.max(...data.map(y))],
    //     nice: true,
    //     round: true
    // })

    return(
        <>
            <div className='svgDiv'>
            <span onClick={onPrev}><FontAwesomeIcon  icon={faAngleLeft} size='3x' color='#a4a4a4' /></span>
                <svg ref={containerRef} width={width} height={height}>
                    <Group top={15}>
                        {
                            isbuttonPrev ? <>
                                <NodeGroup
                                    data={showData}
                                    keyAccessor={d => d.letter}
                                    start={(data, index) => ({
                                        opacity: [0.8],
                                        fill: 'green',
                                        width: xScale.bandwidth(),
                                        // x: [width + width-(4-index)*xScale.bandwidth()+index*5],
                                        // x: [width+index*xScale.bandwidth()],
                                        // x:[-width-width+(4-index)*xScale.bandwidth-index*5],
                                        x: [-200],
                                        y: [yScale(y(data))],
                                        height: [innerHeight - yScale(y(data))]
                                    })}
                                    enter={(data, index) => ({
                                        //value: data.frequency, 
                                        width: xScale.bandwidth(),
                                        x: [xScale(x(data))],
                                        y: [yScale(y(data))],
                                        height: [innerHeight - yScale(y(data))],
                                        timing: { duration: 200} 
                                    })}

                                    update={(data, index) => ({
                                        // value: data.frequency,
                                        width: xScale.bandwidth(),
                                        x: [xScale(x(data))],
                                        y: [yScale(y(data))],
                                        height: [innerHeight - yScale(y(data))],
                                        timing: { duration: 200} 
                                    })}

                                    leave={(data, index) => ({
                                        opacity: [0],
                                        x: [800],
                                        value: [data.frequency],
                                        // timing: {duration: 200*index, delay: 10*index}
                                        timing: {duration: 250}

                                    })}
                                >
                                    {
                                        nodes => (
                                            
                                            <g>
                                            {
                                                nodes.map(({ key, data, state }) => {
                                                        console.log(nodes);
                                                    return  (
                                                        
                                                    <BarChart
                                                                    // fill='#4682b4'
                                                                    onMouseOver={() => {
                                                                        showTooltip({
                                                                            tooltipLeft: xScale(x(data)) + 10,
                                                                            tooltipTop: yScale(y(data)) + 10,
                                                                            tooltipData: `${x(data)}: ${Math.floor(y(data))}` 
                                                                        });
                                                                    }}
                                                                    state={state}
                                                                    key={key}
                                                                    onMouseOut={hideTooltip}
                                                                    scale={xScale}
                                                    />
                                                )})
                                            }
                                            </g>
                                        )
                                    }
                                </NodeGroup> 
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
                                    label='\uf118'
                                />
                            </> : 
                        <>
                        <NodeGroup
                            data={showData}
                            keyAccessor={d => d.letter}
                            start={(data, index) => ({
                                opacity: [0.8],
                                fill: 'green',
                                width: xScale.bandwidth(),
                                x: [width + width-(4-index)*xScale.bandwidth()+index*5],
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
                                timing: { duration: 200} 
                            })}

                            update={(data, index) => ({
                                // value: data.frequency,
                                width: xScale.bandwidth(),
                                x: [xScale(x(data))],
                                y: [yScale(y(data))],
                                height: [innerHeight - yScale(y(data))],
                                timing: { duration: 200} 
                            })}

                            leave={(data, index) => ({
                                opacity: [0],
                                x: [-300],
                                value: [data.frequency],
                                // timing: {duration: 200*index, delay: 10*index}
                                timing: {duration: 250}

                            })}
                            // update={this.updateTransition}
                            // leave={this.leaveTransition}
                        >
                        {
                            nodes => (
                                
                                <g>
                                  {
                                  nodes.map(({ key, data, state }) => {
                                        console.log(nodes);
                                    return  (
                                        
                                    <BarChart
                                                    // fill='#4682b4'
                                                    onMouseOver={() => {
                                                        showTooltip({
                                                            tooltipLeft: xScale(x(data)) + 10,
                                                            tooltipTop: yScale(y(data)) + 10,
                                                            tooltipData: `${x(data)}: ${Math.floor(y(data))}` 
                                                        });
                                                    }}
                                                    scale={xScale}
                                                    state={state}
                                                    key={key}
                                                    onMouseOut={hideTooltip}
                                    />
                                  )})}
                                </g>
                              )
                        }
                        </NodeGroup>
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
                            // ticksComponent={(xScale) => {
                            //     return(
                            //         <Text>{'\uf118'}</Text>
                            //     )
                            // }}
                        />
                        </>
                    }
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
                <span onClick={onNext}><FontAwesomeIcon icon={faAngleRight}  size='3x' color='#a4a4a4' /></span>
            </div>
        </>
    )
}

export default TransitionBarChart;