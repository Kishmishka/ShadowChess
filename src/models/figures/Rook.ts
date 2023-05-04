import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureName } from "./Figure";
import blackLogo from '../../img/figures/blad.png'
import whiteLogo from '../../img/figures/lad.png'

export class Rook extends Figure {
	isFirstStep: number = 0;
	constructor(color:Colors, cell:Cell){
		super(color, cell);
		this.logo = color === Colors.WHITE ? whiteLogo:blackLogo;
		this.name = FigureName.ROOK;
	}

	canMove(target: Cell): boolean {
		if(!super.canMove(target)){
			return false
		}
		
		if(this.cell.isEmptyHorizontal(target)){
			return true
		}
		if(this.cell.isEmptyVertical(target)){
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