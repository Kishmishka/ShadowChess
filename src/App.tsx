import React, { useEffect, useState } from 'react';
import { Board } from './models/Board';
import BoardComponent from './components/BoardComponent/BoardComponent';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import positive from "./img/players/positive.png"
import no from "./img/players/no.png"
import negative from "./img/players/negative.png"
import rip from "./img/players/rip.png"
import Bpositive from "./img/players/Bpositive.png"
import Bno from "./img/players/Bno.png"
import Bnegative from "./img/players/Bnegative.png"
import Brip from "./img/players/Brip.png"
import PlayerBoard from './components/PlayerBoard/PlayerBoard';
import check from './img/players/check3.png'
import Bcheck from './img/players/Bcheck2.png'
import whaat from './img/players/what3.png'
import Bwhaat from './img/players/Bwhat3.png'
import { Figure, FigureName } from './models/figures/Figure';
import StartScreen from './components/StartScreen/StartScreen';
import mate from './img/players/mate.png'
import BMate from './img/players/Bmate.png'
import './App.scss';

function App() {
 const [board,setBoard] = useState(new Board());
 const [whitePlayer,setWhitePlayer] = useState(new Player(Colors.WHITE));
 const [blackPlayer,setBlackPlayer] = useState(new Player(Colors.BlACK));
 const [currentPlayer,setCurrentPlayer] = useState<Player|null>(null);
 const [rotate, setRotate] = useState <Number>(0);
 const [whiteFigureSumm, setWhiteFigureSumm]=useState<number>(0)
 const [blackFigureSumm, setBlackFigureSumm]=useState<number>(0)
 const [goTimer, setGoTimer] = useState (false)
 const [whiteMate, setWhiteMate] = useState(false)
 const [blackMate, setBlackMate] = useState(false)
 const [whiteGoRip, setWhiteGoRip] = useState (false)
 const [blackGoRip, setBlackGoRip] = useState (false)
 const [whiteKingForCheck, setWhiteKingForCheck] = useState(false)
 const [blackKingForCheck, setBlackKingForCheck] = useState(false)
 const [showBlackSwapMenu, setShowBlackSwapMenu] = useState(false)
 const [showWhiteSwapMenu, setShowWhiteSwapMenu] = useState(false)
 const [swapFigureFlag, setSwapFigureFlag] = useState(false)
 const [whiteReplacementFigure, setWhiteReplacementFigure] = useState<FigureName |null>(null)
 const [blackReplacementFigure, setBlackReplacementFigure] = useState<FigureName |null>(null)
 const [startScreen, setStartScreen]= useState<boolean>(true)
 const [startTime, setStartTime] = useState(10)
 const [bonusTime, setBonusTime] = useState(0)
 const [showTime, setShowTime] = useState(false)

useEffect(()=>{
	restart()
	setCurrentPlayer(whitePlayer)
},[])

 function restart(){
	const newBoard = new Board();
	newBoard.initCells()
	setBoard(newBoard);
	newBoard.addFigures() 
 }

 function swapPlayer(){
	setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
	setRotate(rotate===0 ? 1 :rotate===1 ? 2 : 1)
	setGoTimer(true)
 }

 function seteWhiteEmotion(whiteFigureSumm:number, blackFigureSumm:number){
	return whiteGoRip?
	 rip:whiteMate?
	 mate:whiteKingForCheck?
	  whaat:blackKingForCheck?
	   check :(whiteFigureSumm-blackFigureSumm) > 3 ?
		 positive: (whiteFigureSumm-blackFigureSumm) < -4 ?
		  negative: no;
 }

 function seteBlackEmotion<String>(whiteFigureSumm:number, blackFigureSumm:number){
	return blackGoRip?
	 Brip:blackMate?
	 BMate:blackKingForCheck?
	  Bwhaat: whiteKingForCheck?
	   Bcheck:(blackFigureSumm-whiteFigureSumm) > 3 ?
		 Bpositive: (blackFigureSumm-whiteFigureSumm) < -4 ?
		  Bnegative: Bno;
}
  return (
    	<div className="App">
			<div className="container">
			<div className="Wpl">
				<PlayerBoard
				color={Colors.WHITE}
				swapFigureFlag={swapFigureFlag}
				goRip={whiteGoRip}
				showTime={showTime}
				bonusTime={bonusTime}
				startTime={startTime}
				showWhiteSwapMenu={showWhiteSwapMenu}
				figures={board.lostBlackFigures} 
				goTimer={goTimer}
				currentPlayer={currentPlayer}
				setReplacementFigure={setWhiteReplacementFigure}
				setGoRip={setWhiteGoRip} 
				setSwapFigureFlag={setSwapFigureFlag}
				setFigureSumm = {setWhiteFigureSumm} 
				avatar={seteWhiteEmotion(whiteFigureSumm, blackFigureSumm)} />
			</div>
			<div  className={["board", whiteGoRip? "blackWin":"", blackGoRip? "whiteWin":"", rotate === 1 ? "rotate_180" : "rotate_360"].join(' ')}>
				<div className={["board__setTime",startScreen? "showStartScreen":""].join(' ')}>
					<StartScreen
					time={startTime}
					bonusTime={bonusTime}
					setShowTime={setShowTime}
					setBonusTime={setBonusTime}
					setStartTime={setStartTime}
					setStartScreen={setStartScreen}
					></StartScreen>
				</div>
				<BoardComponent
				board={board}
				swapFigureFlag={swapFigureFlag}
				showBlackSwapMenu={showBlackSwapMenu}
				showWhiteSwapMenu={showWhiteSwapMenu}
				whiteReplacementFigure={whiteReplacementFigure}
				blackReplacementFigure={blackReplacementFigure}
				whiteKingForCheck={whiteKingForCheck}
				blackKingForCheck={blackKingForCheck}
				currentplayer={currentPlayer}
				rotate={rotate}
				setWhiteMate={setWhiteMate}
				setBlackMate={setBlackMate}
				setWhiteGoRip={setWhiteGoRip}
				setBlackGoRip={setBlackGoRip}
				setShowBlackSwapMenu={setShowBlackSwapMenu}
				setShowWhiteSwapMenu={setShowWhiteSwapMenu} 
				setBlackKingForCheck={setBlackKingForCheck}
				setWhiteKingForCheck={setWhiteKingForCheck}
				setBoards={setBoard} 
				swapPlayer={swapPlayer} />
			</div>
			<div className="Bpl">
				<PlayerBoard
				color={Colors.BlACK}
				swapFigureFlag={swapFigureFlag}
				goTimer={goTimer}
				currentPlayer={currentPlayer}
				figures={board.lostWhiteFigures} 
				goRip={blackGoRip}
				showTime={showTime}
				bonusTime={bonusTime}
				startTime={startTime} 
				showWhiteSwapMenu={showBlackSwapMenu}
				setSwapFigureFlag={setSwapFigureFlag}
				setReplacementFigure={setBlackReplacementFigure}
				setGoRip={setBlackGoRip} 
				setFigureSumm = {setBlackFigureSumm} 
				avatar={seteBlackEmotion(whiteFigureSumm, blackFigureSumm)}/>
			</div>
			</div>
		</div>

  );
}

export default App;
