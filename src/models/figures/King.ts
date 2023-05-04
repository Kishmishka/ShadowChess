import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureName } from "./Figure";
import blackLogo from '../../img/figures/bking.png'
import whiteLogo from '../../img/figures/king.png'

export class King extends Figure {
	isFirstStep: number = 0;
	constructor(color:Colors, cell:Cell){
		super(color, cell);
		this.logo = color === Colors.WHITE ? whiteLogo:blackLogo;
		this.name = FigureName.KING;
	}

	canMove(target: Cell): boolean {
		if(!super.canMove(target)){
			return false
		}
		
		if(this.isFirstStep===0 && target.y===this.cell.y &&(target.x===this.cell.x+2) &&
			(target.board.getCell(this.cell.x+1,this.cell.y).isEmpty()
			&&target.board.getCell(this.cell.x+2,this.cell.y).isEmpty())
			&&target.board.getCell(this.cell.x+3,this.cell.y).figure?.isFirstStep===0){
				return true
		}
		
		if(this.isFirstStep===0 && target.y===this.cell.y && (target.x===this.cell.x-2) &&
		(target.board.getCell(this.cell.x-1,this.cell.y).isEmpty())
		&&(target.board.getCell(this.cell.x-2,this.cell.y).isEmpty())
		&&(target.board.getCell(this.cell.x-3,this.cell.y).isEmpty())
		&&(target.board.getCell(this.cell.x-4,this.cell.y).figure?.isFirstStep===0)){
				
			return true
		}
		
		if(Math.abs(this.cell.x-target.x)<=1 
		&& Math.abs(this.cell.y-target.y)<=1 ){
			return true
		}
		return false
	}

	moveFigure(target: Cell): void {
		super.moveFigure(target);
		this.isFirstStep +=1;
	}

	goBackFigure(target: Cell): void {
		if(this.color===Colors.WHITE && target.y===7  || this.color===Colors.BlACK && target.y===0){
			this.isFirstStep -=1;
		}
	}
}