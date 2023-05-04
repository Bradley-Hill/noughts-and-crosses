const gameCell = (function(){
  const Cell = () => {
    const state = {
        value: 0
    };

    const setValue = (newValue) => {
        state.value = newValue;
    };

    const getValue = () => {
        return state.value;
    };

    return {
        setValue, getValue
    };
  };

  const CellOne = Cell();
  const CellTwo = Cell();
  const CellThree = Cell();
  const CellFour = Cell();
  const CellFive = Cell();
  const CellSix = Cell();
  const CellSeven = Cell();
  const CellEight = Cell();
  const CellNine = Cell();

})();

//Creating Gameboard function
const GameBoard = (function() {
    // code here
    const Rows = 3
    const Columns = 3
    const board = []

    for (let i = 0; i < Rows; i++){
        board[i] = [];
        for (let j = 0; j < Columns; j++){
            board[i][j] = gameCell.Cell();
        }
    }
  })();


// const GameBoard = (() {
//   const rows = 3
//   const columns = 3
//   const board = []
  
//   for (let i = 0; i < rows; i++) {
//     board[i] = [];
//     for (let j = 0; j < columns; j++) {
//       board[i].push(Cell());
//     }
//   }

//   // This will be for the UI to access the board state.
//   const getBoard = () => board;

//   const placeMarker = (player, column, row)=>{
//     // add code to check its a valid place/not occupied already
//     const placeMarker = (player, column, row)=>{
//         if(areAllCellsFull()){
//             return "Game Over!"
//         }
//         // add code to check its a valid place/not occupied already
//         const availableCells = board.filter((row)=> row[column].getValue() === 0).map(row => row[column])
//       };
//     }
// })();