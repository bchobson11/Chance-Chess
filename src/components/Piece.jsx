import React from 'react'

export default function Piece({piece, isActivePiece}) {

  const activePiece = isActivePiece ? 'drop-shadow-[0_0px_10px_#3b82f6]': ''

  return (
    <div>
      <img 
        src={piece.image}
        className={`${activePiece}`}
      />
    </div> 
  )
}
