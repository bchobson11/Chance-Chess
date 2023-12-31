import React, { useState } from 'react'
import Piece from './Piece'

export default function ChessSquare( {isDarkColor, piece, isActivePiece, handleClick, isAvailableMove, x, y} ) {

  const color = isAvailableMove? 'bg-blue-500' : isDarkColor? 'bg-blue-300' : 'bg-white'

  function handleMouseDown() {
    handleClick(piece, isAvailableMove, x, y)
  }

  return (
    <div 
      className={`${color} flex items-center justify-center w-20 h-20 border border-black border-2`}
      onMouseDown={handleMouseDown}
    >
      {piece && <Piece piece={piece} isActivePiece={isActivePiece}/>}
    </div>
    )
}


