import React from 'react'
import { useState } from 'react'
import ChessSquare from './ChessSquare'
import initialPieces  from '../data/chessPieces'

export default function Chessboard() {

  const [pieces, setPieces] = useState(initialPieces)
  const [activePiece, setActivePiece] = useState(null)
  const [teamTurn, setTeamTurn ] = useState('w')
  
  const verticalAxis = ['1', '2', '3','4', '5', '6', '7', '8'].reverse()
  const horizontalAxis = ['A', 'B', 'C','D', 'E', 'F', 'G', 'H']

  const chessSquares = verticalAxis.map((y, yIndex) =>
    horizontalAxis.map((x, xIndex) => {

      let piece = null
      let isActivePiece = false
      for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].x == xIndex && pieces[i].y == yIndex) {
          piece = pieces[i]
          if (piece == activePiece) {
            isActivePiece = true
          } 
        }
      }
      
      let isAvailableMove = activePiece?.availableMove(xIndex, yIndex)
      let isDarkColor = calculateColor(xIndex, yIndex)

      function handleClick(piece) {
        
        if (!piece && !isAvailableMove) { 
          setActivePiece(null)
        } 
        if (piece?.team == teamTurn) {
          setActivePiece(pieces[pieces.indexOf(piece)])
        }
        else if (isAvailableMove) {
          let index = pieces.indexOf(activePiece)
          const newPieces = pieces.slice()
          newPieces[index].x = xIndex 
          newPieces[index].y = yIndex 
          setPieces(newPieces)
          setActivePiece(null)
          setTeamTurn(teamTurn == 'b'? 'w' : 'b')
        }
      }

      return (
        <ChessSquare key={x+y} isDarkColor={isDarkColor} piece={piece} isActivePiece={isActivePiece} handleClick={handleClick} isAvailableMove={isAvailableMove} />
      )
    })
  )

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
