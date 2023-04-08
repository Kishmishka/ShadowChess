import React, { FC } from 'react';
import ReactSlider from "react-slider";
import './TimeSlider.scss'

interface TimeSliderProps{
	marks: number
	min: number
	max: number
	value:number
	setValue:(value:number)=>void
}


const TimeSlider:FC<TimeSliderProps> = ({marks,min,max,value,setValue}) => {
	return(
		<ReactSlider
		className='timeSlider'
		trackClassName='timeSlider__track'
		thumbClassName='timeSlider__thumb'
		markClassName='timeSlider__mark'
		marks={marks}
		min={min}
		max={max}
		value={value}
		onChange={(value)=>setValue(value)}
		/>
)
}
export default TimeSlider