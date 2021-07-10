import { Group } from '@visx/group';
import { Bar } from '@visx/shape';

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
                rx={3}
                ry={3}
            />
            
        </Group>
    )
}
export default BarChart;