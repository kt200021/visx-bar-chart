import letterFrequency from '@visx/mock-data/lib/mocks/letterFrequency';
import { useState } from 'react';
import { Group } from '@visx/group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Barchart.css'
import Node from './Node';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useTooltip, useTooltipInPortal} from '@visx/tooltip';

const data = letterFrequency   //get mock data in form {letter, frequency}


const TransitionBarChart = () => {

    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
      } = useTooltip();     //useTooltip hook

      const { containerRef, TooltipInPortal } = useTooltipInPortal({
          detectBounds: true,
          scroll: true
      })
      
    const [index, setIndex] = useState(5);      //index is used to get how much data to take at a time
    const [isbuttonPrev, setIsButtonPrev] = useState(false);   


    const onNext = () => {      //onClick event handler for on click next button
        
        setIndex(index => Math.min(index+5, 26));
        setIsButtonPrev(false);
    }

    const onPrev = () => {      //onClick event handler for on click prev button
        setIndex(Math.max(index-5, 5));
        setIsButtonPrev(true);
    }


    const showData = data.slice(Math.max(index-5, 0), index)    //How much data to show currently

    

    return(
        <>
            <div className='svgDiv' style={{width:"100%"}}>
            <span onClick={onPrev}><FontAwesomeIcon  icon={faAngleLeft} size='3x' color='#a4a4a4' /></span> 
                <svg ref={containerRef} style={{maxWidth:'400', width:'90%', height:'600'}}>
                    <Group top={15}>
                        {
                            isbuttonPrev ?      //Show differrent transition on basis of the button pressed
                                <Node                   //React-move transition node
                                    showData={showData} 
                                    showTooltip={showTooltip} 
                                    hideTooltip={hideTooltip}
                                    xStart={-200}
                                    xLeave={800}
                                    data={data}
                                /> : 
                                <Node 
                                    showData={showData} 
                                    showTooltip={showTooltip} 
                                    hideTooltip={hideTooltip}
                                    xStart={800}
                                    xLeave={-300}
                                    data={data}
                                />    
                    }
                    </Group>
                </svg>
                {tooltipOpen && (       // if tooltipOpen is true show tootltip with data
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