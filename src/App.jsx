import Player from "./components/player";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./components/winning-combinations.js";

// 玩家初始值
const PLAYERS = {
  X: "palyer1",
  O: "palyer2",
};

// 遊戲版面初始值
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlay = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlay = "O";
  }
  return currentPlay;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const drawGame = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, cloIndex) {
    setGameTurns((prevTurns) => {
      const currentPlay = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: cloIndex }, player: currentPlay },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  // 點下按鈕重新遊戲
  function reGame() {
    setGameTurns([]);
  }

  // 更新玩家名稱
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((pre) => {
      return {
        ...pre,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initalName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            changeName={handlePlayerNameChange}
          />
          <Player
            initalName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            changeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || drawGame) && <GameOver winner={winner} reGame={reGame} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
