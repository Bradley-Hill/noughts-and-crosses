const playerForm = document.getElementById('player-form');

playerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const playerName1Input = document.getElementById('player1-name');
    const playerName2Input = document.getElementById('player2-name');
    const playerMarker1Input = document.getElementById('player1-marker');
    const playerMarker2Input = document.getElementById('player2-marker');
})

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
        setValue, 
        getValue
    };
  };

  return {
    Cell
  };

})();

//Creating Gameboard function
const GameBoard = (function() {
    const {Cell} = gameCell;
    const Rows = 3
    const Columns = 3
    const board = []

    for (let i = 0; i < Rows; i++){
        board[i] = [];
        for (let j = 0; j < Columns; j++){
            board[i][j] = Cell();
        };
    };

    const getBoard = () => board;

    return {getBoard};
  })();

const playerFactory = (function(){
    const createPlayer = (name,marker) => {
        if (marker !== 'X' && marker !== 'O'){
            throw new Error('Invalid marker, must be either "X" or "O"');
        }
    return{name,marker};
    };
    return {createPlayer};
})();

//Displaying the gameBoard
console.log(GameBoard.getBoard());

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