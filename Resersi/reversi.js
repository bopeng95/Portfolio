// reversi.js
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function repeat (value, n) {
  let arr = []
  for (var i = 0; i < n; i++) {
    arr.push(value)
  }
  return arr
};

function generateBoard (rows, columns, beAdded) {
  if (typeof beAdded !== 'undefined') { return repeat(beAdded, (rows * columns)) }
  return repeat(' ', (rows * columns))
};

function rowColToIndex (board, rowNumber, columnNumber) {
  let size = board.length
  let sqRoot = Math.sqrt(size)
  let row = 0
  let column = 0

  if (rowNumber > (sqRoot - 1) && columnNumber > (sqRoot - 1)) { return 'Invalid row and col number!' }
  if (rowNumber > (sqRoot - 1)) { return 'Invalid row number!' }
  if (columnNumber > (sqRoot - 1)) { return 'Invalid col number!' }

  for (var i = 0; i < size; i++) {
    if (row === rowNumber && column === columnNumber) {
      return i
    }
    column++
    if (column === sqRoot) {
      row++
      column = 0
    }
  }
};

function indexToRowCol (board, i) {
  let obj = {
    row: 0,
    col: 0
  }
  let row = 0
  let col = 0
  let size = board.length
  let sqRoot = Math.sqrt(size)

  if (i > size - 1) { return '2nd argument too big!' }

  for (var k = 0; k < i; k++) {
    col++
    if (col === sqRoot) {
      row++
      col = 0
    }
  }
  obj.row = row
  obj.col = col
  return obj
};

function setBoardCell (board, letter, row, col) {
  let arrCopy = board.slice(0)
  let index = rowColToIndex(arrCopy, row, col)
  if (Number.isInteger(index) === false) { return 'Invalid' } else {
    arrCopy[index] = letter
    return arrCopy
  }
};

function alphaNumeric (inputtxt) {
  var letters = /^[0-9a-zA-Z]+$/
  if (letters.test(inputtxt)) { return true } else { return false }
}

function algebraicToRowCol (algebraicNotation) {
  if (alphaNumeric(algebraicNotation) === false) { return undefined }
  if (algebraicNotation.length < 2) { return undefined }
  if (isNaN(algebraicNotation.substring(1)) === true) { return undefined }
  const first = algebraicNotation.charAt(0)
  const second = algebraicNotation.substring(1)
  if (parseInt(second) < 1 || parseInt(second) > 26) { return undefined }
  let obj = {
    row: 0,
    col: 0
  }
  let row = 0
  let col = 0

  for (var i = 0; i < alphabet.length; i++) {
    if (alphabet.charAt(i) === first) {
      break
    }
    col++
  }
  row = parseInt(second) - 1
  obj.row = row
  obj.col = col

  return obj
};

function placeLetters (board, letter, algebraicNotation, ...moreAlg) {
  let newArr = board.slice(0)
  const loc = algebraicToRowCol(algebraicNotation)
  newArr = setBoardCell(board, letter, loc.row, loc.col)
  for (let alg of moreAlg) {
    const loc2 = algebraicToRowCol(alg)
    newArr = setBoardCell(newArr, letter, loc2.row, loc2.col)
  }
  return newArr
};

function boardToString (board) {
  let count = 1
  let boardElem = 0
  const newLine = '\n'
  const plusDash = '+---'
  const lastDash = '+---+'
  sqRoot = Math.sqrt(board.length)

  let printBoard = '     '
  for (var i = 0; i < sqRoot; i++) {
    printBoard += alphabet.charAt(i) + '   '
  }
  printBoard += newLine
  for (var i = 0; i < 2 * sqRoot; i++) {
    if (count > 9 && i % 2 === 1) { printBoard += '' } else { printBoard += ' ' }
    if (i % 2 === 0) {
      printBoard += '  '
      for (var j = 0; j < sqRoot; j++) {
        if (j === sqRoot - 1) { printBoard += lastDash } else { printBoard += plusDash }
      }
    } else {
      printBoard += count + ' '
      for (var j = 0; j < sqRoot; j++) {
        let box = '| ' + board[boardElem] + ' '
        let endBox = '| ' + board[boardElem] + ' |'
        if (j === sqRoot - 1) {
          printBoard += endBox
        } else {
          printBoard += box
        }
        boardElem++
      }
      count++
    }
    printBoard += newLine
  }
  printBoard += '   '
  for (var j = 0; j < sqRoot; j++) {
    if (j === sqRoot - 1) { printBoard += lastDash } else { printBoard += plusDash }
  }
  return printBoard
};

function isBoardFull (board) {
  for (var i = 0; i < board.length; i++) {
    if (board[i] === ' ') { return false }
  }
  return true
};

function flip (board, row, col) {
  let i = rowColToIndex(board, row, col)
  if (board[i] === 'X') {
    board[i] = 'O'
  } else if (board[i] === 'O') { board[i] = 'X' }
  return board
};

function flipCells (board, cellsToFlip) {
  let newCopy = board.slice(0)
  for (var i = 0; i < cellsToFlip.length; i++) {
    let arrInArr = cellsToFlip[i]
    for (var j = 0; j < arrInArr.length; j++) {
      let row = arrInArr[j][0]
      let col = arrInArr[j][1]
      newCopy = flip(newCopy, row, col)
    }
  }
  return newCopy
};

function getCellsToFlip (board, lastRow, lastCol) {
  const sqRoot = Math.sqrt(board.length)
  let result = []
  let newArr = board.slice(0)
  let row = lastRow
  let col = lastCol
  const index = rowColToIndex(newArr, lastRow, lastCol)
  const item = newArr[index]
  if (item === 'X') {
    let group = []
    if (newArr[rowColToIndex(newArr, row + 1, lastCol)] === 'O') {
      while (row < sqRoot) {
        row++
        if (newArr[rowColToIndex(newArr, row, lastCol)] === 'O') {
          const cord = [row, lastCol]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, row + 1, lastCol)] === 'X') {
            result.push(group)
            break
          }
        }
      }
    }
    group = []
    row = lastRow
    if (newArr[rowColToIndex(newArr, row - 1, lastCol)] === 'O') {
      while (row >= 0) {
        row--
        if (newArr[rowColToIndex(newArr, row, lastCol)] === 'O') {
          const cord = [row, lastCol]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, row - 1, lastCol)] === 'X') {
            result.push(group)
            break
          }
        }
      }
    }
    group = []
    row = lastRow
    if (newArr[rowColToIndex(newArr, lastRow, col + 1)] === 'O') {
      while (col < sqRoot) {
        col++
        if (newArr[rowColToIndex(newArr, lastRow, col)] === 'O') {
          const cord = [lastRow, col]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, lastRow, col + 1)] === 'X') {
            result.push(group)
            break
          }
        }
      }
    }
    group = []
    col = lastCol
    if (newArr[rowColToIndex(newArr, lastRow, col - 1)] === 'O') {
      while (col >= 0) {
        col--
        if (newArr[rowColToIndex(newArr, lastRow, col)] === 'O') {
          const cord = [lastRow, col]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, lastRow, col - 1)] === 'X') {
            result.push(group)
            break
          }
        }
      }
    }
    group = []
    col = lastCol
    if (newArr[rowColToIndex(newArr, row - 1, col - 1)] === 'O') {
      while (col >= 0 && row >= 0) {
        col--
        row--
        if (newArr[rowColToIndex(newArr, row, col)] === 'O') {
          const cord = [row, col]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, row - 1, col - 1)] === 'X') {
            result.push(group)
            break
          }
        }
      }
    }
    group = []
    col = lastCol
    row = lastRow
    if (newArr[rowColToIndex(newArr, row + 1, col + 1)] === 'O') {
      while (col < sqRoot && row < sqRoot) {
        col++
        row++
        if (newArr[rowColToIndex(newArr, row, col)] === 'O') {
          const cord = [row, col]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, row + 1, col + 1)] === 'X') {
            result.push(group)
            break
          }
        }
      }
    }
    group = []
    col = lastCol
    row = lastRow
    if (newArr[rowColToIndex(newArr, row - 1, col + 1)] === 'O') {
      while (col < sqRoot && row >= 0) {
        col++
        row--
        if (newArr[rowColToIndex(newArr, row, col)] === 'O') {
          const cord = [row, col]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, row - 1, col + 1)] === 'X') {
            result.push(group)
            break
          }
        }
      }
    }
    group = []
    col = lastCol
    row = lastRow
    if (newArr[rowColToIndex(newArr, row + 1, col - 1)] === 'O') {
      while (col >= 0 && row < sqRoot) {
        col--
        row++
        if (newArr[rowColToIndex(newArr, row, col)] === 'O') {
          const cord = [row, col]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, row + 1, col - 1)] === 'X') {
            result.push(group)
            break
          }
        }
      }
    }
  } else if (item === 'O') {
    let group = []
    if (newArr[rowColToIndex(newArr, row + 1, lastCol)] === 'X') {
      while (row < sqRoot) {
        row++
        if (newArr[rowColToIndex(newArr, row, lastCol)] === 'X') {
          const cord = [row, lastCol]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, row + 1, lastCol)] === 'O') {
            result.push(group)
            break
          }
        }
      }
    }
    group = []
    row = lastRow
    if (newArr[rowColToIndex(newArr, row - 1, lastCol)] === 'X') {
      while (row >= 0) {
        row--
        if (newArr[rowColToIndex(newArr, row, lastCol)] === 'X') {
          const cord = [row, lastCol]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, row - 1, lastCol)] === 'O') {
            result.push(group)
            break
          }
        }
      }
    }
    group = []
    row = lastRow
    if (newArr[rowColToIndex(newArr, lastRow, col + 1)] === 'X') {
      while (col < sqRoot) {
        col++
        if (newArr[rowColToIndex(newArr, lastRow, col)] === 'X') {
          const cord = [lastRow, col]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, lastRow, col + 1)] === 'O') {
            result.push(group)
            break
          }
        }
      }
    }
    group = []
    col = lastCol
    if (newArr[rowColToIndex(newArr, lastRow, col - 1)] === 'X') {
      while (col >= 0) {
        col--
        if (newArr[rowColToIndex(newArr, lastRow, col)] === 'X') {
          const cord = [lastRow, col]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, lastRow, col - 1)] === 'O') {
            result.push(group)
            break
          }
        }
      }
    }
    group = []
    col = lastCol
    if (newArr[rowColToIndex(newArr, row - 1, col - 1)] === 'X') {
      while (col >= 0 && row >= 0) {
        col--
        row--
        if (newArr[rowColToIndex(newArr, row, col)] === 'X') {
          const cord = [row, col]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, row - 1, col - 1)] === 'O') {
            result.push(group)
            break
          }
        }
      }
    }
    group = []
    col = lastCol
    row = lastRow
    if (newArr[rowColToIndex(newArr, row + 1, col + 1)] === 'X') {
      while (col < sqRoot && row < sqRoot) {
        col++
        row++
        if (newArr[rowColToIndex(newArr, row, col)] === 'X') {
          const cord = [row, col]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, row + 1, col + 1)] === 'O') {
            result.push(group)
            break
          }
        }
      }
    }
    group = []
    col = lastCol
    row = lastRow
    if (newArr[rowColToIndex(newArr, row - 1, col + 1)] === 'X') {
      while (col < sqRoot && row >= 0) {
        col++
        row--
        if (newArr[rowColToIndex(newArr, row, col)] === 'X') {
          const cord = [row, col]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, row - 1, col + 1)] === 'O') {
            result.push(group)
            break
          }
        }
      }
    }
    group = []
    col = lastCol
    row = lastRow
    if (newArr[rowColToIndex(newArr, row + 1, col - 1)] === 'X') {
      while (col >= 0 && row < sqRoot) {
        col--
        row++
        if (newArr[rowColToIndex(newArr, row, col)] === 'X') {
          const cord = [row, col]
          group.push(cord)
          if (newArr[rowColToIndex(newArr, row + 1, col - 1)] === 'O') {
            result.push(group)
            break
          }
        }
      }
    }
  }
  return result
};

function isValidMove (board, letter, row, col) {
  const begin = board[rowColToIndex(board, row, col)]
  if (begin !== ' ') { return false }
  board[rowColToIndex(board, row, col)] = letter
  const set = getCellsToFlip(board, row, col)
  if (set.length === 0) {
    board[rowColToIndex(board, row, col)] = ' '
    return false
  }
  board[rowColToIndex(board, row, col)] = ' '
  return true
};

function isValidMoveAlgebraicNotation (board, letter, algebraicNotation) {
  if (algebraicToRowCol(algebraicNotation) === undefined) { return false }
  const obj = algebraicToRowCol(algebraicNotation)
  if (isValidMove(board, letter, obj.row, obj.col) === true) { return true }
  return false
};

function getLetterCounts (board) {
  let obj = {
    X: 0,
    O: 0
  }
  let dark = 0
  let light = 0
  for (var i = 0; i < board.length; i++) {
    if (board[i] === 'X') { dark++ }
    if (board[i] === 'O') { light++ }
  }
  obj.X = dark
  obj.O = light

  return obj
};

function getValidMoves (board, letter) {
  let arr = []
  const size = board.length
  for (var i = 0; i < size; i++) {
    const obj = indexToRowCol(board, i)
    if (isValidMove(board, letter, obj.row, obj.col) === true) {
      const valid = [obj.row, obj.col]
      arr.push(valid)
    }
  }
  return arr
};

module.exports = {
  repeat: repeat,
  generateBoard: generateBoard,
  rowColToIndex: rowColToIndex,
  indexToRowCol: indexToRowCol,
  setBoardCell: setBoardCell,
  algebraicToRowCol: algebraicToRowCol,
  placeLetters: placeLetters,
  boardToString: boardToString,
  isBoardFull: isBoardFull,
  flip: flip,
  flipCells: flipCells,
  getCellsToFlip: getCellsToFlip,
  isValidMove: isValidMove,
  isValidMoveAlgebraicNotation: isValidMoveAlgebraicNotation,
  getLetterCounts: getLetterCounts,
  getValidMoves: getValidMoves
}
