import React,{FC, useState} from 'react'
import { Colors } from '../../models/Colors'
import { Figure, FigureName } from '../../models/figures/Figure'
import LostFigures from '../LostFigures/LostFigures'
import Timer from '../Timer/Timer'
import { Player } from '../../models/Player'
import SwapMenu from '../SwapMenu/SwapMenu'
import './PlayerBoard.scss'

interface PlayerBoardProps{
	figures: Figure[]
	showTime:boolean
	avatar:string
	currentPlayer:Player | null
	color:Colors
	goTimer:boolean
	goRip:boolean
	bonusTime:number
	startTime:number
	showWhiteSwapMenu:boolean;
	setFigureSumm:(summ:number)=>void
	setReplacementFigure:(figure:FigureName | null)=>void
	setGoRip:(rip:boolean)=>void
}

const PlayerBoard: FC<PlayerBoardProps> = ({figures, goRip,showTime, avatar, color, bonusTime, startTime, currentPlayer, showWhiteSwapMenu, goTimer, setFigureSumm, setReplacementFigure, setGoRip}) => {
	
	return(
		<div className='player'>
			<div className={["player__timer", showTime? "show":""].join(' ')}>
				<Timer 
				goRip={goRip}
				bonusTime={bonusTime}
				startTime={startTime}
				setGoRip={setGoRip} 
				goTimer={goTimer}
				currentPlayer={currentPlayer}
				color={color}
				/>
			</div>
				<SwapMenu
				showWhiteSwapMenu={showWhiteSwapMenu}
				setReplacementFigure={setReplacementFigure}
				playerColor={color}
				/>
		
			
			<div className="player_avatar">
			<img src={avatar}/>
			</div>
			<LostFigures setFigureSumm={setFigureSumm} figures={figures}/>
			
		</div>
)
}
export default PlayerBoard