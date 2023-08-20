import React from 'react'
import { useState, useEffect } from 'react'

import Board from './Board'
import initialPieces  from '../data/chessPieces'

export default function Game() {

  const [pieces, setPieces] = useState(initialPieces)
  const [capturedPieces, setCapturedPieces] = useState([])
  const [board, setBoard] = useState(() => initializeBoard())
  const [activePiece, setActivePiece] = useState(null)
  const [availableMoves, setAvailableMoves] = useState([])
  const [teamTurn, setTeamTurn ] = useState('w')

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

  useEffect(() => {
    if (activePiece) {
      setAvailableMoves(activePiece.availableMove(board))
    } else {
      setAvailableMoves([])
    }
  }, [activePiece, board])

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
      let capturedPiece = board[y][x]

      const newPieces = pieces.map((piece) => 
        piece === activePiece ? { ...piece, y, x} : piece
      )
      // capture piece
      if (capturedPiece) {
        console.log(`${activePiece.name} takes`, capturedPiece.name)
        newPieces.splice(newPieces.indexOf(capturedPiece), 1)
        setCapturedPieces([...capturedPieces, capturedPiece])
      }
      setPieces(newPieces)
      setActivePiece(null)
      setTeamTurn(teamTurn == 'b'? 'w' : 'b')
    }
  }

  return (
    <div>
      <Board board={board} activePiece={activePiece} handleClick={handleClick} availableMoves={availableMoves} />
    </div>
  )
}

