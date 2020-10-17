import React from "react"
import {PieChart, Pie, Sector} from "recharts";
import "./MainChart.scss"


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, payload, percent, value } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  const renderColor = payload.type === "expenses" ? "#9F2E2E" : "#0FC721"

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={renderColor}// fill of the selected input
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={renderColor} // fill of the outsider selected input
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={"#777"} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={"#777"} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} style={{fontSize:13, color: renderColor}} textAnchor={textAnchor} fill="#777">{`${payload.type} ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


class MainChart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            activeIndex: 1,
            width : window.innerWidth,
            height : 135,
        }
    }


    componentDidMount() {
      window.addEventListener("resize", this.updateDimensions);
      return () => window.removeEventListener("resize", this.updateDimensions);
    }

    getInitialState() {
    return {
      activeIndex: 1,
    };
  }

  onPieEnter =(data, index) => {
    this.setState({ activeIndex: index});
  }

    render () {
    return (
        <PieChart width={this.state.width} height={this.state.height} className={this.props.className}>
        <Pie 
        activeIndex={this.state.activeIndex}
        activeShape={renderActiveShape}
        startAngle={180} 
        endAngle={0} 
        data={this.props.data}
        cx={(this.state.width/2)-5} 
        cy={this.state.height} 
        outerRadius={this.state.height * .6} 
        fill={this.state.activeIndex === 0 ? "#2E9622" : "#803638"}
        onMouseEnter={this.onPieEnter}
        />
        </PieChart>
    );
    }
}

export default MainChart