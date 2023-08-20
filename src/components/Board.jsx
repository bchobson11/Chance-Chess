import React from 'react'

import ChessSquare from './ChessSquare'

export default function Board({board, activePiece, handleClick, availableMoves}) {

  const xLabels = ['1','2','3','4','5','6','7','8'].reverse()
  const yLabels = ['A','B','C','D','E','F','G','H']

  const chessSquares = []
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {

      let piece = board[y][x]

      chessSquares.push(
        <ChessSquare 
          key={yLabels[y] + xLabels[x]} 
          isDarkColor={calculateColor(x,y)} 
          piece={piece} 
          isActivePiece={piece && piece == activePiece} 
          handleClick={handleClick} 
          isAvailableMove={inArray(availableMoves, [y,x])}
          x={x}
          y={y}
        />
      )
    }
  }
  return (
    <div className='border border-black border-2 grid grid-cols-8'>
      {chessSquares}
    </div>
  )
}

function calculateColor(xIndex, yIndex) {

  // starting color for the first column in each row
  let isDarkColor = xIndex % 2 == 0

  // alternate color for each column in that row
  if (yIndex % 2 == 0) {
    isDarkColor = !isDarkColor
  }

  return isDarkColor
}

function inArray(outerArr, innerArr) {
  const index = outerArr.findIndex(subarray => {
    return subarray.every((value, index) => value === innerArr[index]);
  });

  return index !== -1
}
