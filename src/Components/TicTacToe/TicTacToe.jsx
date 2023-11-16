import React, { useState } from 'react';
import './TicTacToe.css';
import logo from '../Assets/logo.png';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const initialData = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  const [data, setData] = useState(initialData);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(Math.random() < 0.5 ? "x" : "o");

  const toggle = (num) => {
    if (lock || data[num] !== "") {
      return;
    }
    const newData = [...data];
    newData[num] = currentIcon;
    setData(newData);
    setCount(count + 1);
    checkWin(newData);
    setCurrentIcon(currentIcon === "x" ? "o" : "x"); // Switch icon for the next move
  };

  const checkWin = (currentData) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (currentData[a] && currentData[a] === currentData[b] && currentData[b] === currentData[c]) {
        won(currentData[a]);
        return;
      }
    }

    if (count === 8) {
      // All boxes are filled, it's a draw
      setLock(true);
      displayResult("It's a draw!");
    }
  };

  const won = (winner) => {
    setLock(true);
    displayResult(`Congrats: ${winner.toUpperCase()} Wins`);
  };

  const displayResult = (message) => {
    document.querySelector('.title').innerHTML = message;
  };

  const reset = () => {
    setData(initialData);
    setCount(0);
    setLock(false);
    displayResult('Tic Tac Toe');
  };

  const renderBox = (index) => (
    <div className="boxes" onClick={() => toggle(index)}>
      {data[index] === "x" ? <img src={cross_icon} alt="cross" /> : null}
      {data[index] === "o" ? <img src={circle_icon} alt="circle" /> : null}
    </div>
  );

  return (
    <div className="container">
    <div className="title-box">
      <img src={logo} alt="logo" className="logo" />
      <h1 className="title" dangerouslySetInnerHTML={{ __html: 'Tic Tac Toe' }} />
    </div>


      <div className="board">
        {[0, 1, 2].map((row) => (
          <div className={`row${row + 1}`} key={row}>
            {[0, 1, 2].map((col) => (
              <React.Fragment key={col}>{renderBox(row * 3 + col)}</React.Fragment>
            ))}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;