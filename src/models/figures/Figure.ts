import { Cell } from "../Cell";
import { Colors } from "../Colors";
import logo from '../../img/pe.png'
import { King } from "./King";

export enum FigureName{
	FIGURE = "Фигура",
	KING = "Король",
	KNIGHT = "Конь",
	PAWN = "Пешка",
	QUEEN = "Ферзь",
	ROOK = "Ладья",
	BISHOP = "Слон",

}

export class Figure{
	color: Colors;
	logo: string ;
	cell: Cell;
	name: FigureName;
	id: number;
	isFirstStep: number = 0;
	constructor(color: Colors, cell:Cell){
		this.color = color;
		this.cell = cell;
		this.cell.figure=this;
		this.logo="";
		this.name=FigureName.FIGURE;
		this.id=Math.random();
	}

	canMove(target:Cell):boolean{
		if(target.figure?.color === this.color){
			return false
		}
		return true;
	}

	canAttacWhiteKing(target:Cell){
		if(this.canMove(target)&&this.kingAnderAttac(target)&&target.figure?.color===Colors.WHITE){
			return true
		}
		else{
			return false
		}
	}
	canAttacBlackKing(target:Cell){
		if(this.canMove(target)&&this.kingAnderAttac(target)&&target.figure?.color===Colors.BlACK){
			return true
		}
		else{
			return false
		}
	}

	
	kingAnderAttac(target:Cell){
		if(target.figure?.name===FigureName.KING){
			return true
		}else{
			return false
		}
	}
	
	// goBack(target: Cell){
	// }
	
	moveFigure(target: Cell){
	}

	goBackFigure(target:Cell): void {
	}
}