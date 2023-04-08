import React, {FC} from 'react'
import TimeSlider from '../Slider/TimeSlider'
import './StartScreen.scss'

interface StartScreenProps{
	time:number
	bonusTime:number
	setStartTime:(time:number)=>void
	setStartScreen:(time:boolean)=>void
	setBonusTime:(time:number)=>void
	setShowTime:(show:boolean)=>void
}

const StartScreen:FC<StartScreenProps> = ({time,bonusTime,setStartTime,setShowTime,setStartScreen,setBonusTime}) => {
	return(
		<div className="timeSlider">
			<div className="timeSlider__item">
			Initial time: {time} min
				<TimeSlider
				value={time}
				setValue={setStartTime}	
				marks={1}
				max={30}
				min={1}
				></TimeSlider>
			</div>
			Bonus time: {bonusTime} s
			<div className="timeSlider__item">
				<TimeSlider
				value={bonusTime}
				setValue={setBonusTime}	
				marks={1}
				max={30}
				min={0}
				></TimeSlider>
			</div>
			<div className="timeSlider__button"
			onClick={()=>{
				setStartScreen(false);
				setShowTime(true);
				
			}}>
				Set time
			</div>
		</div>
)
}
export default StartScreen