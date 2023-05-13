(function(){

  //TODO:Define elements from HTML for Script
  const playerForm = document.getElementById('player-form');
  const gridContainer = document.getElementById('grid-container');
  const activePlayer = document.getElementById('active-player');

  //TODO:GameBoard FUNCTION(IIFE)
  const gameBoard = (function(){
    //TODO:array of 2D 3x3 Grid for cells
    const grid = [];

    for(let i=0; i < 3; i++) {
      for(let j=0; j < 3; j++) {
        const cell = {
          row:i,
          col:j,
          value:"",
        };
        grid.push(cell);
        const div = document.createElement("div")
        div.classList.add('cell')
        div.setAttribute("data-row", cell.row);
        div.setAttribute("data-col", cell.col);
        div.textContent = ""
        gridContainer.appendChild(div);

      }
    }
    function getIndex(row, col) {
      return row * 3  + col;
    }
  
    //TODO:FUNCTION to update GameBoard after players turn

    //TODO:FUNCTION to verify if chosen cell is empty

    //TODO:FUNCTION to check if all cells are full/marked
 
    return {
      //TODO:Expose public methods and properties
      getGameBoard: function() {
        return grid
      },
      getIndex: getIndex,
    };
  })();

  //TODO:PlayerModule FUNCTION(IIFE)
  const playerModule = (function(){
    //Factory Function to create player objects with Name and Marker
    const createPlayer = (name,marker) => {
      if(typeof name !== 'string'){
        throw new Error('Invalid name, try again, with letters this time...')
      }
      if (marker !== 'X' && marker !== 'O'){
        marker='';
      }
      return {name, marker};
    };

    const getPlayerNames = () => {
      const playerOneNameInput = document.getElementById('player1-name');
      const playerTwoNameInput = document.getElementById('player2-name');

      const playerOneMarkerInput = document.getElementById('player1-marker');
      const playerTwoMarkerInput = document.getElementById('player2-marker');

      const playerOneName = playerOneNameInput.value;
      const playerTwoName = playerTwoNameInput.value;
      const playerOneMarker = playerOneMarkerInput.value.toUpperCase();
      const playerTwoMarker = playerTwoMarkerInput.value.toUpperCase();

      return{
        playerOneMarker,
        playerTwoMarker,
        playerOneName,
        playerTwoName
      };
    };

    return {
      //TODO:Expose public methods and properties
      createPlayer,
      getPlayerNames
    };
  })();

  //TODO:GameModule FUNCTION(IIFE)
  const gameModule = (function(){
    //TODO:Function to switch/select active player
    let currentPlayer;

    function firstMove(playerOne, playerTwo){
      let firstPlayer = playerOne;
      if (Math.random() > 0.5 ){
        firstPlayer = playerTwo;
      }
      return firstPlayer;
      }

    function setCurrentPlayer(player){
      currentPlayer = player;
    }

    //TODO:Function to check GameBoard for a win state
    function checkWinState(){
      const gameBoardArray = gameBoard.getGameBoard();

      for(let row = 0; row < 3; row++){
        if(
          gameBoardArray[row*3].value !== "" &&
          gameBoardArray[row*3].value === gameBoardArray[row*3 + 1].value &&
          gameBoardArray[row*3].value === gameBoardArray[row*3 + 2].value
        ){
          return true;
        }
      }

      for (let col = 0; col < 3; col++){
      if(
        gameBoardArray[col].value !== "" &&
        gameBoardArray[col].value === gameBoardArray[col + 3].value &&
        gameBoardArray[col + 3].value === gameBoardArray[col + 6].value
      ){
        return true;
      }
    }

    if(
      gameBoardArray[0].value !== "" &&
      gameBoardArray[0].value === gameBoardArray[4].value &&
      gameBoardArray[4].value === gameBoardArray[8].value
    ){
      return true;
    }
    return false;
  }

//FUNCTION for checking gameState
function checkGameState() {
  const isWin = checkWinState();
  if (isWin) {
    return currentPlayer;
  } else {
    //TODO Check for tie state otherwise return null if no winner and no tie yet
    return null;
  }
}

return {
  //TODO:Expose public methods and properties
  firstMove,
  getCurrentPlayer: () => currentPlayer,
  setCurrentPlayer,
  checkGameState,
};
})();

//TODO:UIModule FUNCTION(IIFE)
const uiModule = (function() {
  let playerOne;
  let playerTwo;

  function initGame() {
    const { playerOneName, playerTwoName, playerOneMarker, playerTwoMarker } = playerModule.getPlayerNames();

    playerOne = playerModule.createPlayer(playerOneName, playerOneMarker);
    playerTwo = playerModule.createPlayer(playerTwoName, playerTwoMarker);

    const firstPlayer = gameModule.firstMove(playerOne, playerTwo);
    console.log(`${firstPlayer.name} goes first!`);
    console.log(firstPlayer.marker);

    gameModule.setCurrentPlayer(firstPlayer);
    activePlayer.textContent = gameModule.getCurrentPlayer().name;
  }

  playerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    initGame();
  });

  //FUNCTION to display gameBoard to User.
  const displayGameBoard = () => {
    console.log(gameBoard.getGameBoard());
  }


  //TODO:Event listener for cell selection click.
  const handleCellClick = function(event) {
    const clickedCell = event.target;
    const row = parseInt(clickedCell.getAttribute("data-row"));
    const col = parseInt(clickedCell.getAttribute("data-col"));
    const currentPlayer = gameModule.getCurrentPlayer();

    const cell = gameBoard.getGameBoard()[gameBoard.getIndex(row, col)];

if(cell.value !== ""){
  console.log("Cell already filled.Choose an unoccupied cell.");
  return;
}

    cell.value = currentPlayer.marker;
    clickedCell.textContent = currentPlayer.marker;

    gameModule.checkGameState();
    const winner = gameModule.checkGameState();

    if(winner){
      gameModule.setCurrentPlayer(winner);
      console.log(`${winner.name} wins!`);
      //other actiions to be performedon a win HERE!!!!
      } else {
        gameModule.setCurrentPlayer(currentPlayer === playerOne ? playerTwo : playerOne);
        activePlayer.textContent = gameModule.getCurrentPlayer().name;
      }

    gameModule.checkGameState();

    console.log(`Current player: ${gameModule.getCurrentPlayer().name}`);
    console.log(`Current player's marker: ${gameModule.getCurrentPlayer().marker}`);
  };

  gridContainer.addEventListener("click", handleCellClick);

  //TODO:FUNCTION to display Winner to user.

  //TODO:FUNCTION to display current player to user.

  return {
    //TODO:Expose public methods and properties
    displayGameBoard: displayGameBoard,
    initGame: initGame,
  };
})();

})();
