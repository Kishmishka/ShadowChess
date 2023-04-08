import { NULL } from "sass";
import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure, FigureName} from "./figures/Figure";


export class Cell{
	readonly x:number;
	readonly y:number;
	readonly color:Colors;
	figure: Figure | null;
	board: Board;
	avalible:boolean;
	id:number;
	recentlyEaten: Figure| null = null;
	constructor(board:Board, x:number, y:number, color:Colors, figure:Figure| null){
		this.x=x;
		this.y=y;
		this.color=color;
		this.figure=figure;
		this.board=board;
		this.avalible=false;
		this.id=Math.random();
	}

	isEnemy(target:Cell){
		return target.figure !==null
	}
	
	isEmpty(){
		return this.figure === null
	}

	isEmptyVertical(target:Cell):boolean{
		if(this.x !==target.x){
			return false
		}
		const min = Math.min(this.y, target.y)
		const max = Math.max(this.y, target.y)
		for (let y = min+1; y < max; y++) {
			if(!this.board.getCell(this.x,y).isEmpty()){
				return false
			}
		}
		return true
	}

	isEmptyDiagonal(target:Cell):boolean{
		
		const differentsX= Math.abs(this.x-target.x)
		const differentsY= Math.abs(this.y-target.y)
		if(differentsX!==differentsY){
			return false
		}

		const dy = this.y<target.y ? 1 : -1
		const dx = this.x<target.x ? 1 : -1

		for (let i = 1; i < differentsX; i++) {
			if(!this.board.getCell(this.x + dx*i, this.y+dy*i).isEmpty())
			return false
		}
		return true
	}

	isEmptyHorizontal(target:Cell):boolean{
		if(this.y !==target.y){
			return false
		}
		const min = Math.min(this.x, target.x)
		const max = Math.max(this.x, target.x)
		for (let x = min+1; x < max; x++) {
			if(!this.board.getCell(x,this.y).isEmpty()){
				return false
			}
		}
		return true
	}

	setFigure(figure:Figure){
		this.figure=figure;
		this.figure.cell=this
	}
	
	goBack(target:Cell){
		if(this.figure){
			this.figure.goBack(target)
			target.setFigure(this.figure);
			if(this.recentlyEaten !== null){
				this.figure=this.recentlyEaten
				if(this.figure.color===Colors.BlACK){
					this.board.lostBlackFigures.pop()
				}
				else{
					this.board.lostWhiteFigures.pop()
				}
				this.recentlyEaten = null
			}else{
				this.figure=null;
			}
		}
	}

	moveWithoutRules(target:Cell){
		if(this.figure){
			this.figure.moveFigure(target);
			target.setFigure(this.figure);
			this.figure=null;
		}
	}

	smallCastling(){
		this.board.getCell(this.x+3,this.y).moveWithoutRules(this.board.getCell(this.x+1,this.y))
		this.moveWithoutRules(this.board.getCell(this.x+2,this.y))
		
	}

	cancelSmallCastling(){
		this.board.getCell(this.x+2,this.y).moveWithoutRules(this)
		this.board.getCell(this.x+1,this.y).moveWithoutRules(this.board.getCell(this.x+3,this.y))
		this.figure?.goBackFigure();
		this.board.getCell(this.x+3,this.y).figure?.goBackFigure()
	}

	bigCastling(){
		
		this.board.getCell(this.x-4,this.y).moveWithoutRules(this.board.getCell(this.x-1,this.y))
		this.moveWithoutRules(this.board.getCell(this.x-2,this.y))
		
	}

	cancelBigCastling(){
		this.board.getCell(this.x-2,this.y).moveWithoutRules(this)
		this.board.getCell(this.x-1,this.y).moveWithoutRules(this.board.getCell(this.x-4,this.y))
		this.figure?.goBackFigure();
		this.board.getCell(this.x-4,this.y).figure?.goBackFigure()
	}

	moveFigure(target:Cell){
		if(this.figure && this.figure?.canMove(target)){
			this.figure.moveFigure(target)
			if(target.figure!==null){
				if(target.figure.color===Colors.BlACK){
					this.board.lostBlackFigures.push(target.figure)
					target.recentlyEaten = target.figure
				}
				else{
					this.board.lostWhiteFigures.push(target.figure)
					target.recentlyEaten = target.figure
				}
			}
			target.setFigure(this.figure);
			this.figure=null;
			// if(target.figure?.name===FigureName.KING && target.figure){
			// 	// this.setFigure(target.figure)
			// 	// target.figure=null
			// 	target.goBack(this)
			// }
		}
	}
}