import React from "react"
import { SingleDatePicker } from 'react-dates';




class Calendar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            date: null,
        }
    }
    render() {
        return (
            <SingleDatePicker
            date={this.state.date} // momentPropTypes.momentObj or null
            onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            id="your_unique_id" // PropTypes.string.isRequired,
            orientation="vertical"
            showDefaultInputIcon
            withFullScreenPortal
            onClose={(date) => this.props.onClose(date)}
          />
        )
    }
}

export default Calendar