import React, { FC, useState,useEffect } from 'react'
import { Board } from '../../models/Board'
import { Cell } from '../../models/Cell';
import { Colors } from '../../models/Colors';
import { FigureName } from '../../models/figures/Figure';
import { Player } from '../../models/Player';
import CellComponent from '../CellComponent/CellComponent';
import './Board.scss'

interface BoardProps{
	board:Board;
	currentplayer:Player|null
	whiteKingForCheck:boolean
	blackKingForCheck:boolean
	whiteReplacementFigure:FigureName|null
	blackReplacementFigure:FigureName|null
	showWhiteSwapMenu:boolean;
	showBlackSwapMenu:boolean;
	rotate:Number
	swapFigureFlag:boolean;
	swapPlayer: () => void
	setBoards:(board:Board)=>void
	setWhiteKingForCheck:(chek:boolean) => void
	setBlackKingForCheck:(chek:boolean) => void
	setShowWhiteSwapMenu:(show:boolean) => void
	setShowBlackSwapMenu:(show:boolean) => void
	setBlackGoRip:(rip:boolean) => void
	setWhiteGoRip:(rip:boolean) => void
	setBlackMate:(mate:boolean) => void
	setWhiteMate:(mate:boolean) => void
}
const BoardComponent:FC<BoardProps> = (
	{board, 
	showWhiteSwapMenu,
	showBlackSwapMenu,
	whiteKingForCheck, 
	blackKingForCheck, 
	currentplayer, 
	rotate, 
	whiteReplacementFigure,
	blackReplacementFigure,
	swapFigureFlag,
	setBlackMate,
	setWhiteMate,
	setWhiteGoRip,
	setBlackGoRip,
	setBoards, 
	swapPlayer, 
	setWhiteKingForCheck, 
	setBlackKingForCheck, 
	setShowWhiteSwapMenu,
	setShowBlackSwapMenu}) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null); 

	function clickCell(cell:Cell){
		let castling = ""
		if(!showWhiteSwapMenu && !showBlackSwapMenu &&selectedCell && selectedCell!== cell && selectedCell.figure?.canMove(cell)){
			if(selectedCell.figure.name===FigureName.KING && cell.x===(selectedCell.x+2)){
				if(whiteKingForCheck||blackKingForCheck){
					setSelectedCell(null)
					return 0
				}else{
					castling = "smallCastling"
					selectedCell.smallCastling();
				}
			}else{
				if(selectedCell.figure.name===FigureName.KING && cell.x===(selectedCell.x-2)){
					if(whiteKingForCheck||blackKingForCheck){
						setSelectedCell(null)
						return 0
					}else{
						castling = "bigCastling"
						selectedCell.bigCastling();
					}
				}else{
					selectedCell.moveFigure(cell)
				}
			}
			
			const colorCheck = board.CheckForCheck()
			
			if(castling){
				if(colorCheck === cell.figure?.color){
					if(castling === "smallCastling"){
						selectedCell.cancelSmallCastling()
						setTimeout(()=>setSelectedCell(null),10)
						castling = ""
					}else{
						selectedCell.cancelBigCastling()
						setTimeout(()=>setSelectedCell(null),10)
						castling = ""
						console.log(selectedCell.figure?.name);
						console.log(selectedCell.figure?.isFirstStep);
					}
				}else{
					if(colorCheck!=Colors.NOT){
						selectedCell.moveFigure(cell)
						const mate = board.CheckForMate(colorCheck)
		
						if((colorCheck===Colors.WHITE)){
							setBlackMate(mate)
							setWhiteGoRip(mate)
							return 0 
						}else{
							setWhiteMate(mate)
							setBlackGoRip(mate)	
							return 0 
						}
					}
					swapPlayer()
					setSelectedCell(null)
					
				}
			}else{
				if(colorCheck===Colors.BlACK){
					setBlackKingForCheck(true)
				}
				if(colorCheck===Colors.WHITE){
					setWhiteKingForCheck(true)
				}
				if(colorCheck===Colors.NOT){
					setWhiteKingForCheck(false)
					setBlackKingForCheck(false)
				}
	
				if(colorCheck===cell.figure?.color){
						cell.goBack(selectedCell)
						setTimeout(()=>setSelectedCell(null),10)
						if(selectedCell.figure?.name!==FigureName.KING&&(colorCheck!==Colors.NOT)&&(!blackKingForCheck&&!whiteKingForCheck)
							||(selectedCell.figure?.name===FigureName.KING&&(!blackKingForCheck&&!whiteKingForCheck))){
							setWhiteKingForCheck(false)
							setBlackKingForCheck(false)
						}
				}else{
					if((cell.figure?.name===FigureName.PAWN
						&&cell.figure.color===Colors.WHITE&&cell.y===0)||(cell.figure?.name===FigureName.PAWN
						&&cell.figure.color===Colors.BlACK&&cell.y===7)){
							return 0
						}else{
							if(colorCheck!=Colors.NOT){
								selectedCell.moveFigure(cell)
								const mate = board.CheckForMate(colorCheck)
				
								if((colorCheck===Colors.WHITE)){
									setBlackMate(mate)
									setWhiteGoRip(mate)
								}else{
									setWhiteMate(mate)
									setBlackGoRip(mate)	
								}
							}
							swapPlayer()
							setSelectedCell(null)
							
						}
				}
			}
			
		}else{
			if(cell.figure?.color=== currentplayer?.color){
				setSelectedCell(cell);
			}
			
		}
		if(showWhiteSwapMenu||showBlackSwapMenu){
			setSelectedCell(null)
		}
		if(selectedCell && selectedCell== cell){
			setSelectedCell(null)
		}
	}
	
	function highLightCells(){
		board.highLightCells(selectedCell)
		updateBoard()
	}

	function updateBoard(){
		const newBoard = board.getCopyBoard()
		setBoards(newBoard);
	}

	useEffect(()=>{highLightCells()},[selectedCell?.id])
	return(
		<div className='board'>
			{board.cells.map((row,index)=>
			<React.Fragment key={index}>
				{row.map(cell=>
					<CellComponent
					swapFigureFlag={swapFigureFlag}
					rotate={rotate}
					cell={cell} 
					key={cell.id}
					selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
					whiteReplacementFigure = {whiteReplacementFigure}
					blackReplacementFigure = {blackReplacementFigure}
					setShowBlackSwapMenu={setShowBlackSwapMenu}
					setShowWhiteSwapMenu={setShowWhiteSwapMenu}
					swapPlayer={swapPlayer}
					clickCell={clickCell} 
					/>
					)}
			</React.Fragment>
			)}
		</div>
)
}
export default BoardComponent