(function(){

const playerForm = document.getElementById('player-form');
const gridContainer = document.getElementById('grid-container');

function validateMarkers(playerMarker1, playerMarker2) {
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
}

playerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const playerMarker1Input = document.getElementById('player1-marker');
  const playerMarker2Input = document.getElementById('player2-marker');
  const playerNameInput = document.getElementById('player1-name');
  const playerName2Input = document.getElementById('player2-name');

  const playerMarker1 = playerMarker1Input.value;
  const playerMarker2 = playerMarker2Input.value;
  const playerName1 = playerNameInput.value;
  const playerName2 = playerName2Input.value;

  validateMarkers(playerMarker1, playerMarker2);

   const initGame = (() => {
    const playerOne = playerFactory.createPlayer(playerName1, playerMarker1);
    const playerTwo = playerFactory.createPlayer(playerName2, playerMarker2);
    const board = GameBoard.getBoard()
    console.log(board)
    const firstPlayer = firstMove(playerOne, playerTwo);
    console.log(`${firstPlayer.name} goes first.`);

    return () => {
      console.log(playerOne);
      console.log(playerTwo);
    }
  })();

  initGame();
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
          }
      }
  
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

    function firstMove(playerOne, playerTwo){
      let firstPlayer = playerOne;
      if (Math.random() > 0.5 ){
        firstPlayer = playerTwo;
      }
      return firstPlayer;
    }

    const gameLogic = (function(){
      //gameLogic functions go here

      let currentPlayer = firstPlayer

        
        // for initialising game
          function initGame(playerName1,playerName2,playerMarker1,playerMarker2){ 
            const playerOne = playerFactory.createPlayer(playerName1,playerMarker1);
            const playerTwo = playerFactory.createPlayer(playerName2,playerMarker2);
            const board = GameBoard.getBoard();
            const firstPlayer = firstMove(playerOne,playerTwo);
            console.log(`${firstPlayer.name} goes first.`);
            currentPlayer = firstPlayer
            return firstPlayer;
        }

        function placeMarker(row, col){
          //TODO for player to place a marker
          const board = GameBoard.getBoard();
          const cell = board[row][col];
          //TODO add code to place currentPlayer marker in cell
        }

        const board =GameBoard.getBoard();
        for(let row = 0; row < board.length; row++){
          for (let col = 0; col < board[row].length; col++){
            const cell = board[row][col];
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.id = `cell-${row}-${col}`;
            cellElement.addEventListener('click', ()=>{
              placeMarker(row,col);
            });
            gridContainer.appendChild(cellElement);
          }
        }

        function checkWin() {
            //TODO for checking win condition
        }
        function checkTie() {
            //TODO for checking tie condition
        }
        function switchPlayer() {
            // for switching players turn
            currentPlayer = (currentPlayer === playerOne) ? playerOne : playerTwo; 
        }
  
        return {initGame,checkWin,checkTie,switchPlayer,firstMove,placeMarker};
      })();

    validateMarkers(playerMarker1, playerMarker2);

    gameLogic.initGame(playerName1, playerName2,playerMarker1, playerMarker2,firstMove);

    
})();
        //Displaying the gameBoard
        console.log(GameBoard.getBoard());
    console.log(playerOne);
    console.log(playerTwo);