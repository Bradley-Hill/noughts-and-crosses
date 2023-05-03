const GameBoard = (() {
  const rows = 3
  const columns = 3
  const board = []
  
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  // This will be for the UI to access the board state.
  const getBoard = () => board;

  const placeMarker = (player, column, row)=>{
    // add code to check its a valid place/not occupied already
    const placeMarker = (player, column, row)=>{
        if(areAllCellsFull()){
            return "Game Over!"
        }
        // add code to check its a valid place/not occupied already
        const availableCells = board.filter((row)=> row[column].getValue() === 0).map(row => row[column])
      };
    }
})();