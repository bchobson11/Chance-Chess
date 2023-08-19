import React from 'react'
import { useState, useEffect } from 'react'
import ChessSquare from './ChessSquare'
import initialPieces  from '../data/chessPieces'

export default function Chessboard() {

  const [activePiece, setActivePiece] = useState(null)

  const [teamTurn, setTeamTurn ] = useState('w')
  
  const [pieces, setPieces] = useState(initialPieces)
  const [board, setBoard] = useState(() => initializeBoard())
  
  useEffect(() => {
    setBoard(initializeBoard())
  }, [pieces])

  function initializeBoard() {
    let initialBoard = Array.from(Array(8), () => new Array(8).fill(null))
    pieces.forEach(piece => {
      initialBoard[piece.y][piece.x] = piece
    })

    return initialBoard
  }

  function handleClick(piece, isAvailableMove, x, y) {
    // if you don't click on a piece or a square that the active piece can move to
    // setActive piece to null
    if (!piece && !isAvailableMove) {
      console.log('reset')
      setActivePiece(null)
    } 
    // if it is your team's turn and you click on your own piece
    // set active piece to that piece
    else if (piece?.team == teamTurn) {
      setActivePiece(pieces[pieces.indexOf(piece)])
    }

    else if (isAvailableMove) {
      console.log('move piece')
      let index = pieces.indexOf(activePiece)
      const newPieces = pieces.slice()
      newPieces[index].x = x
      newPieces[index].y = y
      setPieces(newPieces)
      setActivePiece(null)
      setTeamTurn(teamTurn == 'b'? 'w' : 'b')
    }
  }

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
          isAvailableMove={activePiece?.availableMove(x, y)}
          x={x}
          y={y}
        />
      )
    }
  }

  //////////////
  // const chessSquares = verticalAxis.map((y, yIndex) =>
  //   horizontalAxis.map((x, xIndex) => {

  //     let piece = null
  //     let isActivePiece = false
  //     for (let i = 0; i < pieces.length; i++) {
  //       if (pieces[i].x == xIndex && pieces[i].y == yIndex) {
  //         piece = pieces[i]
  //         if (piece == activePiece) {
  //           isActivePiece = true
  //         } 
  //       }
  //     }
      
  //     let isAvailableMove = activePiece?.availableMove(xIndex, yIndex)
  //     let isDarkColor = calculateColor(xIndex, yIndex)

  //     function handleClick(piece) {
        
  //       if (!piece && !isAvailableMove) { 
  //         setActivePiece(null)
  //       } 
  //       if (piece?.team == teamTurn) {
  //         setActivePiece(pieces[pieces.indexOf(piece)])
  //       }
  //       else if (isAvailableMove) {
  //         let index = pieces.indexOf(activePiece)
  //         const newPieces = pieces.slice()
  //         newPieces[index].x = xIndex 
  //         newPieces[index].y = yIndex 
  //         setPieces(newPieces)
  //         setActivePiece(null)
  //         setTeamTurn(teamTurn == 'b'? 'w' : 'b')
  //       }
  //     }

  //     return (
  //       <ChessSquare key={x+y} isDarkColor={isDarkColor} piece={piece} isActivePiece={isActivePiece} handleClick={handleClick} isAvailableMove={isAvailableMove} />
  //     )
  //   })
  // )

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