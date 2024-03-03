export default function GameOver({ winner, reGame }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner ? <p>{winner} won!</p> : <p>It's Darw</p>}
      <p>
        <button onClick={reGame}>Rematch!</button>
      </p>
    </div>
  );
}
