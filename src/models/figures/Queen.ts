import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureName } from "./Figure";
import blackLogo from '../../img/figures/bfz.png'
import whiteLogo from '../../img/figures/fz.png'


export class Queen extends Figure {
	constructor(color:Colors, cell:Cell){
		super(color, cell);
		this.logo = color === Colors.WHITE ? whiteLogo:blackLogo;
		this.name = FigureName.QUEEN;
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
		if(this.cell.isEmptyDiagonal(target)){
			return true
		}

		
		return false
		
	}
}
