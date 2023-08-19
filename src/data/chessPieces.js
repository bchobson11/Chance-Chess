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

function pawnMoves(board) {
  const direction = (this.team === "b") ? -1 : 1; // Pawn's movement direction based on color

  const moves = [
    [direction, 0],     // Move one step forward
    [direction * 2, 0], // Initial double-step move
  ];

  const attackMoves = [
    [direction, 1],     // Capture diagonally right
    [direction, -1]     // Capture diagonally left
  ]

  let availableMoves = [];

  for (const [dy, dx] of moves) {
    const y = this.y + dy;
    const x = this.x + dx;

    // Check for valid position
    if (y >= 0 && x >= 0 && y <= 7 && x <= 7) {
      // Single step forward and initial double step
      if (dy === direction && !board[y][x]) {
        availableMoves.push([y, x]);
      }
      // Initial double step
      else if (dy === direction * 2 && this.y === (this.team === "b" ? 6 : 1) &&!board[y][x] && !board[this.y + direction][x]) {
        availableMoves.push([y, x]);
      }
    }
  }

  // capturing opponent piece
  for (const[dy, dx] of attackMoves) {
    const y = this.y + dy;
    const x = this.x + dx;

    if (y >= 0 && x >= 0 && y <= 7 && x <= 7) {
      if (board[y][x] && board[y][x].team !== this.team) {
        availableMoves.push([y,x])
      }
    }
  }

  return availableMoves;
}


function rookMoves(board) {
  const directions = [
    [0, 1],  // right
    [0, -1], // left
    [1, 0],  // down
    [-1, 0]  // up
  ];

  let availableMoves = [];

  for (const [dy, dx] of directions) {
    let x = this.x + dx;
    let y = this.y + dy;

    while (x >= 0 && x < 8 && y >= 0 && y < 8) {
      // moving to empty square
      if (!board[y][x]) {
        availableMoves.push([y, x]);
      }
      // capturing opponent piece
      else if (board[y][x].team !== this.team) {
        availableMoves.push([y,x])
        break;
      } else break

      x += dx;
      y += dy;
    }
  }

  return availableMoves;
}

function knightMoves(board) {
  const directions = [
    [-2, 1],  // up 2 right 1
    [-2, -1], // up 2 left 1
    [2, 1],   // down 2 right 1
    [2, -1],  // down 2 left 1
    [-1, 2],  // right 2 up 1
    [1, 2],   // right 2 down 1
    [-1, -2], // left 2 up 1
    [1, -2]   // left 2 down 1
  ];

  let availableMoves = [];

  for (const [dy, dx] of directions) {
    const y = this.y + dy;
    const x = this.x + dx;

    // move is valid 
    if (y >= 0 && x >= 0 && y <= 7 && x <= 7) {

      // move to empty square or capture opponent piece
     if (!board[y][x] || board[y][x].team !== this.team) {
      availableMoves.push([y, x]);
     }
    }
  }

  return availableMoves;
}

function bishopMoves(board) {
  const directions = [
    [1, 1],   // diagonal down right
    [-1, 1],  // diagonal up right
    [-1, -1], // diagonal up left
    [1, -1]   // diagonal down left
  ];
  
  let availableMoves = [];

  for (const [dx, dy] of directions) {
    let x = this.x + dx;
    let y = this.y + dy;
    
    while (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      if (!board[y][x]) {
        availableMoves.push([y, x]);
      } 
      // capturing opponent piece
      else if (board[y][x].team !== this.team) {
        availableMoves.push([y,x])
        break;
      } else break

      x += dx;
      y += dy;
    }
  }

  return availableMoves;
}

function queenMoves(board) {
  const directions = [
    [0, 1],   // right
    [0, -1],  // left
    [1, 0],   // down
    [-1, 0],  // up
    [1, 1],   // diagonal down right
    [-1, 1],  // diagonal up right
    [-1, -1], // diagonal up left
    [1, -1]   // diagonal down left
  ];

  let availableMoves = [];

  for (const [dy, dx] of directions) {
    let y = this.y + dy;
    let x = this.x + dx;

    while (y >= 0 && x >= 0 && y <= 7 && x <= 7) {
      if (!board[y][x]) {
        availableMoves.push([y, x]);
      } 
      // capturing opponent piece
      else if (board[y][x].team !== this.team) {
        availableMoves.push([y,x])
        break;
      } else break

      y += dy;
      x += dx;
    }
  }

  return availableMoves;
}

function kingMoves(board) {
  const directions = [
    [0, 1],   // right
    [0, -1],  // left
    [1, 0],   // down
    [-1, 0],  // up
    [1, 1],   // diagonal down right
    [-1, 1],  // diagonal up right
    [-1, -1], // diagonal up left
    [1, -1]   // diagonal down left
  ];

  let availableMoves = [];

  for (const [dy, dx] of directions) {
    const y = this.y + dy;
    const x = this.x + dx;

    // valid move on board
    if (y >= 0 && x >= 0 && y <= 7 && x <= 7) {
      // move to empty square or capture opponent piece
      if (!board[y][x] || board[y][x].team !== this.team) {
        availableMoves.push([y, x]);
      }
    }
  }

  return availableMoves;
}

export default pieces;
