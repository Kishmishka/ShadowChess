import React, { FC, useState,useEffect } from 'react'
import { Cell } from '../../models/Cell'
import { Colors } from '../../models/Colors';
import { Bishop } from '../../models/figures/Bishop';
import { FigureName } from '../../models/figures/Figure';
import { Knight } from '../../models/figures/Knight';
import { Queen } from '../../models/figures/Queen';
import { Rook } from '../../models/figures/Rook';
import "./Cell.scss"

interface CellProps{
	cell:Cell;
	selected: boolean;
	rotate:Number;
	blackReplacementFigure:FigureName|null;
	whiteReplacementFigure:FigureName|null;
	clickCell:(cell:Cell)=>void
	swapPlayer: () => void
	setShowWhiteSwapMenu:(show:boolean) => void
	setShowBlackSwapMenu:(show:boolean) => void
}

const CellComponent: FC<CellProps> = ({
	cell, 
	selected, 
	rotate,
	blackReplacementFigure, 
	whiteReplacementFigure,
	swapPlayer,
	clickCell, 
	setShowBlackSwapMenu,
	setShowWhiteSwapMenu}) => {
	
	useEffect(()=>{
		if(cell.figure?.name===FigureName.PAWN&&cell.y===0&&cell.figure?.color===Colors.WHITE){
			setReplacementFigure(cell,whiteReplacementFigure,Colors.WHITE)
			setShowWhiteSwapMenu(false)
			swapPlayer()
		}
		if(cell.figure?.name===FigureName.PAWN&&cell.y===7&&cell.figure?.color===Colors.BlACK){
			setReplacementFigure(cell,blackReplacementFigure,Colors.BlACK)
			setShowBlackSwapMenu(false)
			swapPlayer()
			
		}},[whiteReplacementFigure,blackReplacementFigure])

	function setSwapMenu(cell:Cell){
		if(cell.figure?.name===FigureName.PAWN&&cell.y===0&&cell.figure?.color===Colors.WHITE){
			setShowWhiteSwapMenu(true)
		}
		if(cell.figure?.name===FigureName.PAWN&&cell.y===7&&cell.figure?.color===Colors.BlACK){
			setShowBlackSwapMenu(true)
		}
	}

	function setReplacementFigure(cell:Cell, ReplacementFigure:FigureName|null, color:Colors){
		switch(ReplacementFigure){
			case FigureName.QUEEN:
				cell.figure = new Queen(color, cell)
				break
			case FigureName.ROOK:
				cell.figure = new Rook(color, cell)
				break
			case FigureName.KNIGHT:
				cell.figure = new Knight(color, cell)
				break	
			case FigureName.BISHOP:
				cell.figure = new Bishop(color, cell)
				break
		}

	}
	
	return(
		<div 
		className={['cell', cell.color, selected ? "selected":"", cell.avalible ? "avalible":"", cell.figure ? "figureOnCell":"", rotate===1 && rotate!=0? "rotate":""].join(' ')}
		onClick={()=>{
			clickCell(cell);
			setSwapMenu(cell);
		}}
		>
			<img src={cell.figure?.logo}  alt="" />
		</div>
)
}
export default CellComponent