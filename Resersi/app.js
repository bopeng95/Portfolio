// app.js
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var rev = require('./reversi.js')
var readlineSync = require('readline-sync')
var fs = require('fs')

/* IF CONFIG EXIST, GAME STARTS WITH CONFIG SETTINGS
   ELSE PLAY GAME NORMALLY
==================================================================================*/
if (process.argv.length === 3) {
  fs.readFile(process.argv[2], 'utf8', function (err, data) {
    if (err) {
      console.log('uh oh', err)
    } else {
      console.log("\nCONFIG TESTING\n")	
      let playerFirst = false
      const config = JSON.parse(data)
      const playerColor = config.boardPreset.playerLetter
      const size = Math.sqrt(config.boardPreset.board.length)
      const playerMoves = config.scriptedMoves.player
      const compMoves = config.scriptedMoves.computer
      if ( compMoves.length >= playerMoves.length ) { playerFirst = true }
      let board = rev.generateBoard(size, size)
      console.log("Computer will make these scripted moves: [ " + compMoves + " ]")
      console.log("Player will make these scripted moves: [ " + playerMoves +" ]\n")
      addToBoard(board, config.boardPreset.board)
      board = addScriptMoves(board, playerColor, notPlayerColor(playerColor), playerMoves, compMoves)
      playGame(board, playerColor, notPlayerColor(playerColor), playerFirst)
    }
  })
} else {
  let properInput = false
  let boardSize = 0
  let playerColor = ''
  console.log('\n~ ! REVERSI ! ~\n')
  while (properInput === false) {
    boardSize = readlineSync.question('How wide should the board be? (even numbers between 4 and 26, inclusive)\n')
    if (isNaN(boardSize) !== true) {
      if (boardSize > 3 && boardSize < 27 && boardSize % 2 === 0) { properInput = true }
    }
  }
  properInput = false
  while (properInput === false) {
    playerColor = readlineSync.question('Pick your letter: X (black) or O (white)\n')
    if (playerColor === 'X' || playerColor === 'O') { properInput = true }
  }
  properInput = false
  console.log('Player is ' + playerColor)
  let playerFirst = false
  if (playerColor === 'X') { playerFirst = true }
  let board = rev.generateBoard(boardSize, boardSize)
  let letter = boardSize / 2
  let number = boardSize / 2
  const X1 = alphabet.charAt(letter) + (number)
  const X2 = alphabet.charAt(letter - 1) + (number + 1)
  const O1 = alphabet.charAt(letter - 1) + (number)
  const O2 = alphabet.charAt(letter) + (number + 1)
  board = rev.placeLetters(board, 'X', X1, X2)
  board = rev.placeLetters(board, 'O', O1, O2)
  console.log(rev.boardToString(board) + '\n')
  playGame(board, playerColor, notPlayerColor(playerColor), playerFirst)
}
/*END
====================================================================================*/

/*PLAY GAME METHOD
=================================================================*/
function playGame (board, player, op, playerFirst) {
  let chk = false
  let userMove = ''
  while (rev.isBoardFull(board) === false) {
    if (rev.getValidMoves(board, op).length === 0 && rev.getValidMoves(board, player).length === 0) {
      console.log('No one has available moves...\n')
      break
    }
  	if (playerFirst === true) {
	    while (chk === false) {
	      if (rev.getValidMoves(board, player).length !== 0) {
		      userMove = readlineSync.question("What's your move?\n")
		      if (rev.isValidMoveAlgebraicNotation(board, player, userMove) === true) {
		      	chk = true
		        board = rev.placeLetters(board, player, userMove)
		        const rowCol = rev.algebraicToRowCol(userMove)
		        let cellsToFlip = rev.getCellsToFlip(board, rowCol.row, rowCol.col)
		        board = rev.flipCells(board, cellsToFlip)
		        console.log(rev.boardToString(board))
		        scoreToString(board)
		      } else {
		      	console.log("\nINVALID MOVE. Your move should:\n* be in a  format\n* specify an existing empty cell\n* flip at elast one of your oponent's pieces\n")
		      }
		    } else {
		  	  chk = true
		  	  console.log('You have no available moves\n')
		    }
	    }
    }
    playerFirst = true
    chk = false
    if (rev.isBoardFull(board) === true) { break }
    readlineSync.question('Press <ENTER> to show computer\'s move...\n')
    if (rev.getValidMoves(board, op).length !== 0) {
      const moves = getComputerMove(rev.getValidMoves(board, op))
      board = rev.setBoardCell(board, op, moves.row, moves.col)
	    let cellsToFlip = rev.getCellsToFlip(board, moves.row, moves.col)
	    board = rev.flipCells(board, cellsToFlip)
	    console.log(rev.boardToString(board))
      console.log("\nComputer moved to " + alphabet.charAt(moves.col) + (moves.row+1))
	    scoreToString(board)
    } else {
      console.log('Computer has no available moves.\n')
    }
  }
  printWin(board, player)
};
/*END
===============================================================================*/

/*METHODS USED IF CONFIG FILE EXISTS
=============================================================================*/
function addToBoard (arr1, arr2) {
  for (var i = 0; i < arr2.length; i++) {
  	arr1[i] = arr2[i]
  }
}

function addScriptMoves (board, playerColor, compColor, player, computer) {
  let chk = false
  let userMove = ''
  const biggest = Math.max(player.length, computer.length)
  const smallest = Math.min(player.length, computer.length)
  let counter = 0;
  console.log(rev.boardToString(board))
  scoreToString(board)
  if(rev.isBoardFull(board) === true) { return board }
  if(playerColor === "X"){
    while (counter < biggest){
      if(counter < player.length) {
        readlineSync.question('Press <ENTER> to show players\'s scripted '+player[counter]+' move...\n')
        board = rev.placeLetters(board, playerColor, player[counter])
        const rowCol = rev.algebraicToRowCol(player[counter])
        let cellsToFlip = rev.getCellsToFlip(board, rowCol.row, rowCol.col)
        board = rev.flipCells(board, cellsToFlip)
        console.log(rev.boardToString(board))
        scoreToString(board)
      }
      else {
        while (chk === false) {
          if (rev.getValidMoves(board, playerColor).length !== 0) {
            userMove = readlineSync.question("What's your move?\n")
            if (rev.isValidMoveAlgebraicNotation(board, playerColor, userMove) === true) {
              chk = true
              board = rev.placeLetters(board, playerColor, userMove)
              const rowCol = rev.algebraicToRowCol(userMove)
              let cellsToFlip = rev.getCellsToFlip(board, rowCol.row, rowCol.col)
              board = rev.flipCells(board, cellsToFlip)
              console.log(rev.boardToString(board)+"\n")
              scoreToString(board)
            } else {
              console.log("\nINVALID MOVE. Your move should:\n* be in a  format\n* specify an existing empty cell\n* flip at elast one of your oponent's pieces\n")
            }
          } else {
          chk = true
          console.log('You have no available moves\n')
          }
        }
        chk = false
      }
      if(player.length > computer.length && counter === biggest-1) { break }
      if(counter < computer.length) {
            readlineSync.question('Press <ENTER> to show computer\'s '+computer[counter]+' scripted move...\n')
            board = rev.placeLetters(board, compColor, computer[counter])
            const rowCol2 = rev.algebraicToRowCol(computer[counter])
            let cellsToFlip2 = rev.getCellsToFlip(board, rowCol2.row, rowCol2.col)
            board = rev.flipCells(board, cellsToFlip2)
            console.log(rev.boardToString(board)+"\n")
            scoreToString(board)
      }
      else {
        readlineSync.question('Press <ENTER> to show computer\'s move...\n')
        if (rev.getValidMoves(board, compColor).length !== 0) {
          const moves = getComputerMove(rev.getValidMoves(board, compColor))
          board = rev.setBoardCell(board, compColor, moves.row, moves.col)
          let cellsToFlip = rev.getCellsToFlip(board, moves.row, moves.col)
          board = rev.flipCells(board, cellsToFlip)
          console.log(rev.boardToString(board))
          console.log("\nComputer moved to " + alphabet.charAt(moves.col) + (moves.row+1))
          scoreToString(board)
        } 
        else {
          console.log('Computer has no available moves.\n')
        }
        if (rev.getValidMoves(board, compColor).length === 0 && rev.getValidMoves(board, playerColor).length === 0) {
          console.log('No one has available moves...\n')
          break
        }
      }
      counter++;
    }
  }
  else if(playerColor === "O"){
    while (counter < biggest){
      if(counter < computer.length) {
            readlineSync.question('Press <ENTER> to show computer\'s '+computer[counter]+' scripted move...\n')
            board = rev.placeLetters(board, compColor, computer[counter])
            const rowCol2 = rev.algebraicToRowCol(computer[counter])
            let cellsToFlip2 = rev.getCellsToFlip(board, rowCol2.row, rowCol2.col)
            board = rev.flipCells(board, cellsToFlip2)
            console.log(rev.boardToString(board)+"\n")
            scoreToString(board)
      }
      else {
        readlineSync.question('Press <ENTER> to show computer\'s move...\n')
        if (rev.getValidMoves(board, compColor).length !== 0) {
          const moves = getComputerMove(rev.getValidMoves(board, compColor))
          board = rev.setBoardCell(board, compColor, moves.row, moves.col)
          let cellsToFlip = rev.getCellsToFlip(board, moves.row, moves.col)
          board = rev.flipCells(board, cellsToFlip)
          console.log(rev.boardToString(board))
          console.log("\nComputer moved to " + alphabet.charAt(moves.col) + (moves.row+1))
          scoreToString(board)
        } 
        else {
          console.log('Computer has no available moves.\n')
        }
        if (rev.getValidMoves(board, compColor) === [] && rev.getValidMoves(board, playerColor) === []) {
          console.log('No one has available moves...')
          break
        }
      }
      if (player.length < computer.length && counter === biggest-1) { break }
      if (counter < player.length) {
        readlineSync.question('Press <ENTER> to show players\'s scripted '+player[counter]+' move...\n')
        board = rev.placeLetters(board, playerColor, player[counter])
        const rowCol = rev.algebraicToRowCol(player[counter])
        let cellsToFlip = rev.getCellsToFlip(board, rowCol.row, rowCol.col)
        board = rev.flipCells(board, cellsToFlip)
        console.log(rev.boardToString(board))
        scoreToString(board)
      }
      else {
        while (chk === false) {
          if (rev.getValidMoves(board, playerColor).length !== 0) {
            userMove = readlineSync.question("What's your move?\n")
            if (rev.isValidMoveAlgebraicNotation(board, playerColor, userMove) === true) {
              chk = true
              board = rev.placeLetters(board, playerColor, userMove)
              const rowCol = rev.algebraicToRowCol(userMove)
              let cellsToFlip = rev.getCellsToFlip(board, rowCol.row, rowCol.col)
              board = rev.flipCells(board, cellsToFlip)
              console.log(rev.boardToString(board)+"\n")
              scoreToString(board)
            } else {
              console.log("\nINVALID MOVE. Your move should:\n* be in a  format\n* specify an existing empty cell\n* flip at elast one of your oponent's pieces\n")
            }
          } else {
            chk = true
            console.log('You have no available moves\n')
          }
        }
        chk = false;
      }
      counter++;
    }
  }
  return board;
}
/*END
=====================================================================================*/

/*HELPER METHODS FOR PLAYGAME
=======================================================================================*/
function getComputerMove (array) {
  let arr = {
    row: 0,
    col: 0
  }
  let row1 = array[0][0]
  let col1 = array[0][1]
  arr.row = row1
  arr.col = col1
  return arr
}

function printWin (board, player) {
  const scores = rev.getLetterCounts(board)
  if (scores.X === scores.O) { console.log('ITS A TIE! ༼ つ ◕_◕ ༽つ\n') }
  if (scores.X > scores.O) {
    if (player === 'X') { console.log('YOU WINNN! (づ｡◕‿‿◕｡)づ\n') } else { console.log('YOU LOOSE! ༼ つ ಥ_ಥ ༽つ\n') }
  }
  if (scores.X < scores.O) {
    if (player === 'O') { console.log('YOU WINNN! (づ｡◕‿‿◕｡)づ\n') } else { console.log('YOU LOOSE! ༼ つ ಥ_ಥ ༽つ\n') }
  }
}

function notPlayerColor (color) {
  if (color === 'X') { return 'O' } else { return 'X' }
}

function scoreToString (board) {
  const scores = rev.getLetterCounts(board)
  console.log('\nScore\n=====\nX: ' + scores.X + '\nO: ' + scores.O + '\n')
}
/*END
=====================================================================================*/
