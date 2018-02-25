module.exports = function solveSudoku(matrix) {
  // your solution
  return tryToSolve(matrix);

  function tryToSolve(matrix) {

    const MAX_NUMBER = 9;
    var possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var usedNumbers = [], usedUniqueNumbers = [], unusedNumbers = [];
    var rowNumbers = [], colNumbers = [], sectionNumbers = [];
    var row = 0, sectionPositionX = 0, sectionPositionY = 0;


    for (var i = 0; i < MAX_NUMBER; i++) {

      usedNumbers = [], usedUniqueNumbers = [], unusedNumbers = [];
      rowNumbers = [], colNumbers = [], sectionNumbers = [];

      for (var j = 0; j < MAX_NUMBER; j++) {
        if (matrix[i][j] == 0) {

          rowNumbers = matrix[i];

          for (row = 0; row < MAX_NUMBER; row++) {
            colNumbers.push(matrix[row][j]);
          }

          sectionPositionX = Math.floor(i / 3) * 3;
          sectionPositionY = Math.floor(j / 3) * 3;

          for (var x = sectionPositionX; x < sectionPositionX + 3; x++) {
            for (var y = sectionPositionY; y < sectionPositionY + 3; y++) {
              sectionNumbers.push(matrix[x][y]);
            }
          }

          usedNumbers = rowNumbers.concat(colNumbers, sectionNumbers);

          usedUniqueNumbers = usedNumbers.filter(function (number, position) {
            if (number) {
              return usedNumbers.indexOf(number) == position;
            } else {
              return false;
            }
          });

          unusedNumbers = possibleNumbers.filter(function (number) {
            return usedNumbers.indexOf(number) < 0;
          });


          for (var tryNumber = 0; tryNumber < unusedNumbers.length; tryNumber++) {
            matrix[i][j] = unusedNumbers[tryNumber];

            if (tryToSolve(matrix)) {
              return tryToSolve(matrix);
            }
          }
          matrix[i][j] = 0;
          return false;
        }
      }
    }
    return matrix;
  }
}


