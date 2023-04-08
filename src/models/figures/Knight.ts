import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureName } from "./Figure";
import blackLogo from '../../img/figures/bkon.png'
import whiteLogo from '../../img/figures/kon.png'

export class Knight extends Figure {
	constructor(color:Colors, cell:Cell){
		super(color, cell);
		this.logo = color === Colors.WHITE ? whiteLogo:blackLogo;
		this.name = FigureName.KNIGHT;
	}

	canMove(target: Cell): boolean {
		if(!super.canMove(target)){
			return false
		}
		const dx = Math.abs(this.cell.x - target.x)
		const dy = Math.abs(this.cell.y - target.y)

		if((dx === 1 && dy === 2) || (dx === 2 && dy === 1)){
				return true
		}
		return false
	}
}