import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureName } from "./Figure";
import blackLogo from '../../img/figures/bpe.png'
import whiteLogo from '../../img/figures/pe.png'
import { King } from "./King";

export class Pawn extends Figure {
	isFirstStep: number = 0;
	constructor(color:Colors, cell:Cell){
		super(color, cell);
		this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
		this.name = FigureName.PAWN;
	}

	canMove(target: Cell): boolean {
		if(!super.canMove(target)){
			return false
		}
		const direction = this.cell.figure?.color === Colors.BlACK ? 1 : -1
		const firstStepdirection = this.cell.figure?.color === Colors.BlACK ? 2 : -2
		if(this.isFirstStep===0 && (target.y === this.cell.y + firstStepdirection) && !this.cell.board.getCell(target.x , target.y-direction).isEmpty()){
			return false
		}
		if((target.y === this.cell.y+direction || this.isFirstStep===0 && (target.y === this.cell.y+ firstStepdirection)) 
		&& target.x === this.cell.x
		&& this.cell.board.getCell(target.x , target.y).isEmpty()){
			return true
		}
		if(target.y ===this.cell.y + direction 
		&& (target.x == this.cell.x + 1 ||target.x == this.cell.x - 1)
		&& this.cell.isEnemy(target)){
			return true
		}
		
		return false
	}

	goBackFigure(target:Cell): void {
		if(this.color===Colors.WHITE && target.y===6 || this.color===Colors.BlACK && target.y===1){
			this.isFirstStep -=1;
		}
		
	}
	moveFigure(target: Cell): void {
		super.moveFigure(target);
		this.isFirstStep +=1;
	}
}