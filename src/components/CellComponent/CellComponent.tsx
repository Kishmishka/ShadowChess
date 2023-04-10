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
	swapFigureFlag:boolean
	blackReplacementFigure:FigureName|null;
	whiteReplacementFigure:FigureName|null;
	clickCell:(cell:Cell)=>void
	swapPlayer: () => void
	setShowWhiteSwapMenu:(show:boolean) => void
	setShowBlackSwapMenu:(show:boolean) => void
	setWhiteKingForCheck:(chek:boolean) => void
	setBlackKingForCheck:(chek:boolean) => void
	setBlackGoRip:(rip:boolean) => void
	setWhiteGoRip:(rip:boolean) => void
	setBlackMate:(mate:boolean) => void
	setWhiteMate:(mate:boolean) => void
}

const CellComponent: FC<CellProps> = ({
	cell, 
	selected, 
	rotate,
	swapFigureFlag,
	blackReplacementFigure, 
	whiteReplacementFigure,
	setBlackGoRip,
	setWhiteGoRip,
	setBlackMate,
	setWhiteMate,
	swapPlayer,
	clickCell,
	setBlackKingForCheck,
	setWhiteKingForCheck,
	setShowBlackSwapMenu,
	setShowWhiteSwapMenu}) => {
	
	useEffect(()=>{
		if(cell.figure?.name===FigureName.PAWN&&cell.y===0&&cell.figure?.color===Colors.WHITE){
			setReplacementFigure(cell,whiteReplacementFigure,Colors.WHITE)
			setShowWhiteSwapMenu(false)

			const colorCheck=cell.board.CheckForCheck()

			if(colorCheck===Colors.BlACK){
				setBlackKingForCheck(true)
				const mate = cell.board.CheckForMate(colorCheck)
				setWhiteMate(mate)
				setBlackGoRip(mate)
			}
			if(colorCheck===Colors.WHITE){
				setWhiteKingForCheck(true)
				const mate = cell.board.CheckForMate(colorCheck)
				setBlackMate(mate)
				setWhiteGoRip(mate)
			}
			if(colorCheck===Colors.NOT){
				setWhiteKingForCheck(false);
				setShowBlackSwapMenu(false)
			}
			swapPlayer()
		}
		if(cell.figure?.name===FigureName.PAWN&&cell.y===7&&cell.figure?.color===Colors.BlACK){
			setReplacementFigure(cell,blackReplacementFigure,Colors.BlACK)
			setShowBlackSwapMenu(false)
			swapPlayer()
			
		}},[swapFigureFlag])

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