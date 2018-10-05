module.exports = function solveSudoku(matrix) {
  const matrixObj = {matrix: matrix};
  solve(matrixObj);
  return matrixObj.matrix;
}

function solve(matrixObj) {
  let cell = {row: 0, col: 0};
  if (!findFreeCell(matrixObj.matrix, cell)) {
    return true;
  }
  for (let num = 1; num <= 9; num++) { 
    if (isSafe(matrixObj.matrix, cell, num)) { 
      matrixObj.matrix[cell.row][cell.col] = num;
      if (solve(matrixObj)) {
        return true;
      }
      matrixObj.matrix[cell.row][cell.col] = 0; 
    } 
  }
  return false;
}

function findFreeCell(matrix, cell) {
  for (cell.row = 0; cell.row < 9; cell.row++)
    for (cell.col = 0; cell.col < 9; cell.col++)
      if (matrix[cell.row][cell.col] === 0) {
        return true;
      }  
  return false; 
}
  
function isUsedInRow(matrix, row, num) { 
  for (let col = 0; col < 9; col++) 
    if (matrix[row][col] === num) {
      return true;
    }
  return false; 
}
  
function isUsedInCol(matrix, col, num) { 
  for (let row = 0; row < 9; row++) 
    if (matrix[row][col] === num) {
      return true;
    }
  return false; 
}
  
function isUsedInBox(matrix, boxStartRow, boxStartCol, num) { 
  for (let row = 0; row < 3; row++) 
    for (let col = 0; col < 3; col++) 
      if (matrix[row + boxStartRow][col + boxStartCol] === num) {
        return true;
      }
  return false; 
}
  
function isSafe(matrix, cell, num) {
  return !isUsedInRow(matrix, cell.row, num) && 
          !isUsedInCol(matrix, cell.col, num) && 
          !isUsedInBox(matrix, cell.row - cell.row % 3 , cell.col - cell.col % 3, num); 
}