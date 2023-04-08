
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Player } from '../../models/Player'
import { Colors } from '../../models/Colors'
import './Timer.scss'

interface TimerProps{
	currentPlayer:Player|null
	color: Colors
	goTimer:boolean
	bonusTime:number
	startTime:number
	setGoRip:(rip:boolean)=>void
	goRip:boolean
}


const Timer:FC<TimerProps> = ({currentPlayer, color, goTimer, goRip, bonusTime, setGoRip,startTime}) => {
	const [blackTime, setBlackTime] = useState(600)
	const [whiteTime, setWhiteTime] = useState(600)
	
	const timer = useRef<ReturnType <typeof setInterval>>()
	useMemo(()=>{
		setBlackTime(startTime*60);
		setWhiteTime(startTime*60);
	},[startTime])

	useMemo(()=>{
		startTimer();
		AddBonusTime(bonusTime)
	},[currentPlayer])
	useMemo(()=>{checkRip()},[whiteTime,blackTime])

	function startTimer(){
		if(goTimer){
			if(timer.current){
				clearInterval(timer.current)
			}
			const callback = currentPlayer?.color===Colors.WHITE ? decrimentWhiteTime : decrimentBlackTime
			timer.current = setInterval(callback, 1000)
			
		}
	}
	function AddBonusTime(bonusTime:number){
		currentPlayer?.color===Colors.WHITE ?setBlackTime(blackTime+bonusTime) : setWhiteTime(whiteTime+bonusTime)
	}
	function checkRip(){
		if(blackTime===0 && color===Colors.BlACK||color===Colors.BlACK && goRip){
			setGoRip(true)
			clearInterval(timer.current)
		}
		if(whiteTime===0 && color===Colors.WHITE||color===Colors.WHITE && goRip){
			setGoRip(true)
			clearInterval(timer.current)
		}
	}
	function decrimentWhiteTime(){
		setWhiteTime(whiteTime => whiteTime-1)
	}
	function decrimentBlackTime(){
		setBlackTime(blackTime => blackTime-1)
	}

	return(
		<div className='timer'>
			{color===Colors.WHITE ? `${Math.floor(whiteTime/60)}:${whiteTime%60<10? `0${whiteTime%60}`: whiteTime%60} `: `${Math.floor(blackTime/60)}:${blackTime%60<10? `0${blackTime%60}`: blackTime%60} `}
		</div>
)
}
export default Timer