const pieces = [
  {
    team: 'b',
    name: 'rook',
    x: 0,
    y: 7,
    image: './black-rook.png',
    availableMove: rookMoves
  },
  {
    team: 'b',
    name: 'rook',
    x: 7,
    y: 7,
    image: './black-rook.png',
    availableMove: rookMoves
  },
  {
    team: 'b',
    name: 'knight',
    x: 1,
    y: 7,
    image: './black-knight.png',
    availableMove: knightMoves
  },
  {
    team: 'b',
    name: 'knight',
    x: 6,
    y: 7,
    image: './black-knight.png',
    availableMove: knightMoves
  },
  {
    team: 'b',
    name: 'bishop',
    x: 2,
    y: 7,
    image: './black-bishop.png',
    availableMove: bishopMoves
  },
  {
    team: 'b',
    name: 'bishop',
    x: 5,
    y: 7,
    image: './black-bishop.png',
    availableMove: bishopMoves
  },
  {
    team: 'b',
    name: 'king',
    x: 4,
    y: 7,
    image: './black-king.png',
    availableMove: kingMoves
  },
  {
    team: 'b',
    name: 'queen',
    x: 3,
    y: 7,
    image: './black-queen.png',
    availableMove: queenMoves
  },
  {
    team: 'w',
    name: 'rook',
    x: 0,
    y: 0,
    image: './white-rook.png',
    availableMove: rookMoves
  },
  {
    team: 'w',
    name: 'rook',
    x: 7,
    y: 0,
    image: './white-rook.png',
    availableMove: rookMoves
  },
  {
    team: 'w',
    name: 'knight',
    x: 1,
    y: 0,
    image: './white-knight.png',
    availableMove: knightMoves
  },
  {
    team: 'w',
    name: 'knight',
    x: 6,
    y: 0,
    image: './white-knight.png',
    availableMove: knightMoves
  },
  {
    team: 'w',
    name: 'bishop',
    x: 2,
    y: 0,
    image: './white-bishop.png',
    availableMove: bishopMoves
  },
  {
    team: 'w',
    name: 'bishop',
    x: 5,
    y: 0,
    image: './white-bishop.png',
    availableMove: bishopMoves
  },
  {
    team: 'w',
    name: 'king',
    x: 4,
    y: 0,
    image: './white-king.png',
    availableMove: kingMoves
  },
  {
    team: 'w',
    name: 'queen',
    x: 3,
    y: 0,
    image: './white-queen.png',
    availableMove: queenMoves
  },
]

for (let i = 0; i < 8; i++) {
  pieces.push({
    team: 'w',
    name: 'pawn',
    y: 1,
    x: i,
    image: './white-pawn.png',
    availableMove: pawnMoves
  })
}

for (let i = 0; i < 8; i++) {
  pieces.push({
    team: 'b',
    name: 'pawn',
    y: 6,
    x: i,
    image: './black-pawn.png',
    availableMove: pawnMoves
  })
}

function pawnMoves(x,y) {
  if (this.team == 'b') {
    return (this.y - y == 1 && this.x == x)
  }
  if (this.team == 'w') {
    return (this.y - y == -1 && this.x == x)
  }
}

function rookMoves(x,y) {
  return ((this.y == y && this.x !== x) || (this.x == x && this.y !== y)) 
}

function knightMoves(x,y) {
  return ((Math.abs(this.x - x) == 2 && Math.abs(this.y - y) == 1) || (Math.abs(this.y - y) == 2 && Math.abs(this.x - x) == 1))
}

function bishopMoves(x,y) {
  return ((Math.abs(this.x - x) == Math.abs(this.y - y)) && (this.x !== x && this.y !== y))
}

function queenMoves(x,y) {
  return (((this.y == y && this.x !== x) || (this.x == x && this.y !== y)) || ((Math.abs(this.x - x) == Math.abs(this.y - y)) && (this.x !== x && this.y !== y)) )
}

function kingMoves(x,y) {
  return (Math.abs(this.x - x) <= 1 && Math.abs(this.y - y) <= 1)
}

function calculateIndex(x,y) {
  return x * 8 + y
}

export default pieces;
