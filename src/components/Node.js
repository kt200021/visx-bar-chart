import { NodeGroup } from 'react-move';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleLinear, scaleBand } from '@visx/scale';
import BarChart from './BarChart';
import '../styles/Barchart.css'
import '../styles/Barchart.css'

const margin = {
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

const Node = (props) => {

    const {data, showData, showTooltip, hideTooltip, xStart, xLeave} = props;
    const yScale = scaleLinear({
        range: [innerHeight, 0],
        domain: [0, Math.max(...data.map(y))],
        nice: true,
        round: true
    })
    
    const xScale = scaleBand({      // Create the x Scale for our barchart
        range: [margin.left, innerWidth+margin.left],
        domain: showData.map(d => d.letter),
        padding: 0.1,
        nice: true,
        
    })

    
    return(
        <>
            <NodeGroup
                data={showData}
                keyAccessor={d => d.letter}
                start={(data, index) => ({      //state on start
                    value: [data.frequency],
                    opacity: [0.8],
                    fill: 'green',
                    width: xScale.bandwidth(),
                    x: [xStart],
                    y: [yScale(y(data))],
                    height: [innerHeight - yScale(y(data))]
                })}
                enter={(data, index) => ({      //state on some data entry
                    value: [data.frequency], 
                    width: xScale.bandwidth(),
                    x: [xScale(x(data))],
                    y: [yScale(y(data))],
                    height: [innerHeight - yScale(y(data))],
                    timing: { duration: 200} 
                })}

                update={(data, index) => ({     //state on some data update
                    value: [data.frequency],
                    width: xScale.bandwidth(),
                    x: [xScale(x(data))],
                    y: [yScale(y(data))],
                    height: [innerHeight - yScale(y(data))],
                    timing: { duration: 200} 
                })}

                leave={(data, index) => ({      //state on some data leave
                    opacity: [0],
                    x: [xLeave],
                    value: [data.frequency],
                    timing: {duration: 250}

                })}
            >
                {
                    nodes => (
                                            
                        <g>
                            {
                                nodes.map(({ key, data, state }) => {
                            
                                return  (
                                                        
                                    <BarChart
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
            />
        </>
    )
}

export default Node;