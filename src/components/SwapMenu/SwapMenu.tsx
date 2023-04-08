import React,{FC} from 'react'
import queenBlackLogo from '../../img/figures/bfz.png'
import queenWhiteLogo from '../../img/figures/fz.png'
import rookBlackLogo from '../../img/figures/blad.png'
import rookWhiteLogo from '../../img/figures/lad.png'
import knightBlackLogo from '../../img/figures/bkon.png'
import knightWhiteLogo from '../../img/figures/kon.png'
import bishopBlackLogo from '../../img/figures/bof.png'
import bishopWhiteLogo from '../../img/figures/of.png'
import { Colors } from '../../models/Colors'
import { Figure, FigureName } from '../../models/figures/Figure'
import './SwapMenu.scss'

interface SwapMenuProps{
	playerColor:Colors;
	showWhiteSwapMenu:boolean;
	setReplacementFigure:(figure:FigureName |null)=>void
}

const SwapMenu: FC<SwapMenuProps> = ({playerColor, showWhiteSwapMenu, setReplacementFigure}) => {
	return(
		<div className={['swapMenu', showWhiteSwapMenu? 'show':''].join(' ')}>
			<div 
			className="swapMenu__element"
			onClick={()=>{setReplacementFigure(FigureName.QUEEN)}}>
				<img src={playerColor===Colors.WHITE? queenWhiteLogo:queenBlackLogo}  alt="" />
			</div>
			<div className="swapMenu__element"
			onClick={()=>{setReplacementFigure(FigureName.ROOK)}}>
				<img src={playerColor===Colors.WHITE? rookWhiteLogo:rookBlackLogo}  alt="" />
			</div>
			<div className="swapMenu__element"
			onClick={()=>{setReplacementFigure(FigureName.KNIGHT)}}>
				<img src={playerColor===Colors.WHITE? knightWhiteLogo:knightBlackLogo}  alt="" />
			</div>
			<div className="swapMenu__element"
			onClick={()=>{setReplacementFigure(FigureName.BISHOP)}}>
				<img src={playerColor===Colors.WHITE? bishopWhiteLogo:bishopBlackLogo}  alt="" />
			</div>
		</div>
)
}
export default SwapMenu