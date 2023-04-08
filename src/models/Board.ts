import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure, FigureName } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board{
	cells:Cell[][]=[]
	lostBlackFigures:Figure[]=[];
	lostWhiteFigures:Figure[]=[];
	public initCells(){
		for (let i = 0; i < 8 ; i++) {
			const row: Cell[] = []
			for (let j = 0; j < 8; j++) {
				if((i+j)%2 !==0){
					row.push(new Cell(this, j, i, Colors.BlACK,null))
				}else{
					row.push(new Cell(this, j, i, Colors.WHITE,null))
				}
			}
			this.cells.push(row)
		}
	}
	public getCell(x:number, y:number){
		return this.cells[y][x]
	}
	public CheckForCheck():Colors{
		for (let i = 0; i < this.cells.length; i++) {
			for (let j = 0; j < this.cells[0].length; j++) {
				const returnValue = this.highLightCells(this.cells[i][j])
				if(returnValue.isCheck[0]){
					return Colors.WHITE
				}
				if(returnValue.isCheck[1]){
					return Colors.BlACK
				}
			}
		}
		return Colors.NOT
	}

	public CheckForMate(colorCheck:Colors):boolean{
		for (let i = 0; i < this.cells.length; i++) {
			for (let j = 0; j < this.cells[0].length; j++) {
				if(this.cells[i][j].figure?.color===colorCheck){
					let returnValue = this.highLightCells(this.cells[i][j]);
					
				 for (const iter of returnValue.avalibleCells) {
					this.cells[i][j].moveFigure(iter)
					console.log(this.cells[i][j])
					console.log(colorCheck)
					if(this.CheckForCheck()===Colors.NOT){
						iter.goBack(this.cells[i][j])
						return false
					}
					iter.goBack(this.cells[i][j])
					
					
				 }
				 returnValue.avalibleCells=[];
				}
			}
		}
		return true
	}
	

	public highLightCells(selectedCels:Cell | null){
		const returnValue={
			avalibleCells:new Array<Cell>,
			isCheck: [false, false]
		}
	
		
		for (let i = 0; i < this.cells.length; i++) {
			const row = this.cells[i];
			for (let j = 0; j < row.length; j++) {
				const target = row[j];
				target.avalible = !!selectedCels?.figure?.canMove(target)
				if(this.cells[i][j].avalible){
					returnValue.avalibleCells.push(this.cells[i][j])
				 }
				 if(selectedCels?.figure?.canAttacWhiteKing(target)){
					returnValue.isCheck[0] = true
				 }
				 if(selectedCels?.figure?.canAttacBlackKing(target)){
					returnValue.isCheck[1] = true
				 }
			}
		}
		return returnValue
	}

	public getCopyBoard():Board{
		const newBoard= new Board();
		newBoard.cells= this.cells
		newBoard.lostBlackFigures= this.lostBlackFigures
		newBoard.lostWhiteFigures= this.lostWhiteFigures
		return newBoard
	}

	private addPawns(){
		for (let i = 0; i < 8; i++) {
			new Pawn(Colors.BlACK, this.getCell(i,1))
			new Pawn(Colors.WHITE, this.getCell(i,6))
		}
	}
	private addKings(){
		new King(Colors.BlACK, this.getCell(4,0))
		new King(Colors.WHITE, this.getCell(4,7))
	}
	private addBishops(){
		for (let i = 2; i < 6; i+=3) {
			new Bishop(Colors.BlACK, this.getCell(i,0))
			new Bishop(Colors.WHITE, this.getCell(i,7))
		}
		
	}
	private addRook(){
		for (let i = 0; i < 8; i+=7) {
			new Rook(Colors.BlACK, this.getCell(i,0))
			new Rook(Colors.WHITE, this.getCell(i,7))
		}
	}
	private addKnights(){
		for (let i = 1; i < 7; i+=5) {
			new Knight(Colors.BlACK, this.getCell(i,0))
			new Knight(Colors.WHITE, this.getCell(i,7))
		}
	}
	private addQueen(){
		new Queen(Colors.BlACK, this.getCell(3,0))
		new Queen(Colors.WHITE, this.getCell(3,7))
	}
	public addFigures(){
		this.addBishops();
		this.addKings();
		this.addKnights();
		this.addPawns();
		this.addQueen();
		this.addRook();
	}
}