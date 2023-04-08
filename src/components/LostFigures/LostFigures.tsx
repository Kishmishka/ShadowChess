import React,{FC, useEffect,useMemo} from 'react'
import { Figure, FigureName } from '../../models/figures/Figure'
import "./LostFigures.scss"

interface LostFigresProps{
	figures:Figure[]
	setFigureSumm:(summ:number)=>void
}

function getLogo(figures:Figure[], name:FigureName){
	return figures.filter(figure=>figure.name === name)[0]?
	<img src={figures.filter(figure=>figure.name === name)[0].logo}  alt="" /> : '' 
}
function getLenght(figures:Figure[], name:FigureName){
	return figures.filter(figure=>figure.name === name).length>0?
	"x"+figures.filter(figure=>figure.name === name).length : '' 
}
function getFigureSumm(figures:Figure[]){
	return figures.filter(figure=>figure.name === FigureName.PAWN).length+
	figures.filter(figure=>figure.name === FigureName.BISHOP).length*3+
	figures.filter(figure=>figure.name === FigureName.KNIGHT).length*3+
	figures.filter(figure=>figure.name === FigureName.ROOK).length*5+
	figures.filter(figure=>figure.name === FigureName.QUEEN).length*9
}	
const LostFigures:FC <LostFigresProps> = ({figures, setFigureSumm}) => {
	useMemo(()=>{setFigureSumm(getFigureSumm(figures))},[figures.length])
	return(
		<div className='lostFigures'>
			<div className="pawns lostFigures_elem">
					{getLogo(figures, FigureName.PAWN)}
					{getLenght(figures, FigureName.PAWN)}
				</div>
				<div className="dishops lostFigures_elem">
					{getLogo(figures, FigureName.BISHOP)}
					{getLenght(figures, FigureName.BISHOP)}
				</div>
				<div className="knights lostFigures_elem">
					{getLogo(figures, FigureName.KNIGHT)}
					{getLenght(figures, FigureName.KNIGHT)}
				</div>
				<div className="rooks lostFigures_elem">
					{getLogo(figures, FigureName.ROOK)}
					{getLenght(figures, FigureName.ROOK)}
				</div>
				<div className="queens lostFigures_elem">
					{getLogo(figures, FigureName.QUEEN)}
					{getLenght(figures, FigureName.QUEEN)}
				</div>
		</div>
)
}
export default LostFigures