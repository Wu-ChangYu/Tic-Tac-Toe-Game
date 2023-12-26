import { useState } from "react";

export default function Player({ initalName, symbol, isActive }) {
  const [playerName, setPlayerName] = useState(initalName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
    // 看當前狀態的值
    // setIsEditing(!isEditing); // False
    // setIsEditing(!isEditing); // False
    // console.log(isEditing);
    // 看狀態最新的值
    // setIsEditing((isEditing) => !isEditing);// False
    // console.log(isEditing);
    // setIsEditing((isEditing) => !isEditing);// True
    // console.log(isEditing);
    // The same result
    // setIsEditing(isEditing ? false : true);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
