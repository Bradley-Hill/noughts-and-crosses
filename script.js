
    const playerForm = document.getElementById('player-form');
  
    playerForm.addEventListener('submit', (event) => {
        event.preventDefault();
  
        const playerMarker1Input = document.getElementById('player1-marker');
        const playerMarker2Input = document.getElementById('player2-marker');
        const playerNameInput = document.getElementById('player1-name');
        const playerName2Input = document.getElementById('player2-name');
  
        const playerMarker1 = playerMarker1Input.value;
        const playerMarker2 = playerMarker2Input.value;
        const playerName1 = playerName1Input.value;
        const playerName2 = playerName2Input.value;
  
        (function validateMarkers(){
            let errorMessage;
  
            if(playerMarker1 === playerMarker2){
                errorMessage = "Both players cannot have the same Mark. Please choose different Marks.";
            } else if (playerMarker1 === 'X' && playerMarker2 === 'X'){
                errorMessage = "Only one player can have the X mark. Please choose different Marks."
            } else if (playerMarker1 === 'O' && playerMarker2 === 'O'){
                errorMessage = "Only one player can have the O mark. Please choose different Marks"
            }
  
            if(errorMessage){
                alert(errorMessage);
                playerMarker1Input.selectedIndex = 0
                playerMarker2Input.selectedIndex = 0
                playerMarker1Input.focus();
            }
        })();
        return playerName1, playerName2, playerMarker1, playerMarker2;
    });
  
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

    const gameLogic = (function(){

        //gameLogic functions go here
        function initGame(){ //TODO for initialising game
            const playerOne = playerFactory.createPlayer(playerName1,playerMarker1);
            const playerTwo = playerFactory.createPlayer(playerName2,playerMarker2);
            const board = GameBoard.getBoard()
            console.log(board)
            const firstPlayer = firstMove(playerOne,playerTwo);
            console.log(`${firstPlayer.name} goes first.`);
        }

        function firstMove(playerOne, playerTwo){
            let firstPlayer = playerOne;
            if (Math.random() > 0.5 ){
              firstPlayer = playerTwo;
            }
            return firstPlayer;
          }
                
        return {initGame}
        })();

        function checkWin() {
            //TODO for checking win condition
        }
        function checkTie() {
            //TODO for checking tie condition
        }
        function switchPlayer() {
            //TODO for switching players turn
        }
  
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