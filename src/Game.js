import React, { useEffect, useState } from 'react';
import './App.css';

const seed = new Date().getMilliseconds();
const initialState = [];

const getRandomInt = (max) => Math.floor(Math.random(seed) * Math.floor(max));

for (let i = 0; i <= 100; ++i) {
  let row = [];
  for (let j = 0; j <= 100; j++) {
    row.push(getRandomInt(2));
  }
  initialState.push(row);
}

const grow = (grid) => {
  let newArray = [];

  grid.forEach((row, rowIndex) => {
    let newRow = [];

    row.forEach((cell, cellIndex) => {
      let newValue = 0;
      const top = grid[rowIndex - 1] ? grid[rowIndex - 1][cellIndex] : 0;
      const left = row[cellIndex - 1] ? row[cellIndex - 1] : 0;
      const right = row[cellIndex + 1] ? row[cellIndex + 1] : 0;
      const bottom = grid[rowIndex + 1] ? grid[rowIndex + 1][cellIndex] : 0;

      const topLeft = grid[rowIndex - 1] ? grid[rowIndex - 1][cellIndex - 1] || 0 : 0;
      const topRight = grid[rowIndex - 1] ? grid[rowIndex - 1][cellIndex + 1] || 0 : 0;
      const bottomLeft = grid[rowIndex + 1] ? grid[rowIndex + 1][cellIndex - 1] || 0 : 0;
      const bottomRight = grid[rowIndex + 1] ? grid[rowIndex + 1][cellIndex + 1] || 0 : 0;

      console.log({
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
      });

      const liveAdjacencyCount = top + left + right + bottom + topLeft + topRight + bottomLeft + bottomRight;

      if (cell === 1) {
        if (liveAdjacencyCount === 2 || liveAdjacencyCount === 3) newValue = 1;
      }
      else if (cell === 0) {
        if (liveAdjacencyCount === 3) newValue = 1;
      }

      newRow.push(newValue);
    });

    newArray.push(newRow);
  });

  return newArray;
}

function Game() {
  const [grid, setGrid] = useState(initialState);
  console.log(grid);

  useEffect(() => {
    const timer = setTimeout(() => setGrid(grow(grid)), 500);
    return grid.every(row => row.every(cell => cell === 0)) ? clearTimeout(timer) : () => clearTimeout(timer);
  }, [grid]);

  return (
    <div className="App">
      <div className='header'>A Reaction to Life</div>
      <div className='grid'>
        {grid.map(row =>
          <div className='row'>
            {row.map(cell =>
              cell ? <div className='cell' /> : <div className='empty' />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
