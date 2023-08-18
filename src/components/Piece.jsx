import React from 'react'

export default function Piece({piece}) {
  return (
    <div>
      <img 
        src={piece.image}
        className=''   
      />
    </div> 
  )
}
