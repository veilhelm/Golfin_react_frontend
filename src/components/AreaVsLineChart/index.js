import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import {ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts"
import "./AreaVsLineChart.scss"
// const data = [{name: 'Page A', uv: 590, pv: 800, amt: 1400},
//               {name: 'Page B', uv: 868, pv: 967, amt: 1506},
//               {name: 'Page C', uv: 1397, pv: 1098, amt: 989},
//               {name: 'Page D', uv: 1480, pv: 1200, amt: 1228},
//               {name: 'Page F', uv: 1400, pv: 680, amt: 1700}];

const PaymentsGoalsChart = ({goalId = ""}) => {
    const payments = useSelector(state => state.goalsReducer.payments)
    const payment = payments.find( payment => payment.goalId === goalId.split("-")[1]) || {}
    const data = payment.payments

    useEffect(() => {
      document.querySelectorAll(".recharts-cartesian-axis-tick-value").forEach( element => {
        element.setAttribute("y","65")
      })
    })
    return (
      <ComposedChart width={300} height={400} data={data}
          margin={{top: 70, right: 0, bottom: 0, left: 0}}>
        <CartesianGrid strokeDasharray="4 4"/>
        <XAxis 
        dataKey="name"
        orientation="top"
        />
        <Tooltip wrapperStyle={{opacity:0.7, borderRadius:"5px"}}/>
        <Legend />
        <Area type='monotone' dataKey='payed' fill='#5e82af' stroke='#5e82af' strokeWidth="3px"/>
        <Line type='monotone' dataKey='quote' stroke='#5EAF8B' strokeWidth="3px"  />
     </ComposedChart>
  );
}

export default PaymentsGoalsChart

