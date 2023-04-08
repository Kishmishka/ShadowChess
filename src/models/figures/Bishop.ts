import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureName } from "./Figure";
import blackLogo from '../../img/figures/bof.png'
import whiteLogo from '../../img/figures/of.png'

export class Bishop extends Figure {
	constructor(color:Colors, cell:Cell){
		super(color, cell);
		this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
		this.name = FigureName.BISHOP;
	}

	canMove(target: Cell): boolean {
		if(!super.canMove(target)){
			return false
		}
		if(this.cell.isEmptyDiagonal(target)){
			return true
		}
		return false
	}
}