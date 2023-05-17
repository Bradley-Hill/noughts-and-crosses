(function(){

  // Define elements from HTML for Script

  const playerForm = document.getElementById('player-form');
  const gridContainer = document.getElementById('grid-container');
  const activePlayer = document.getElementById('active-player');
  const playerOneMarkerInput = document.getElementById('player1-marker');
  const playerTwoMarkerInput = document.getElementById('player2-marker');
  const submitButton = document.getElementById('submit-button');

  //TODO:GameBoard FUNCTION(IIFE)

  const gameBoard = (function(){
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
  
    // Reset the Board state
    const resetBoard = function () {
      gridContainer.innerHTML = '';
      
      gameBoard.getGameBoard().forEach(cell => {
        cell.value = '';
      });
      
      for(let i=0; i < 3; i++) {
        for(let j=0; j < 3; j++) {
          const cell = gameBoard.getGameBoard()[gameBoard.getIndex(i, j)];
          const div = document.createElement('div');        
          div.classList.add('cell')
          div.setAttribute("data-row", cell.row);
          div.setAttribute("data-col", cell.col);
          div.textContent = ""
          gridContainer.appendChild(div);
  
        }
      }
      return grid;
    }
 
    return {
      //TODO:Expose public methods and properties
      getGameBoard: function() {
        return grid
      },
      getIndex: getIndex,resetBoard,
    };
  })();


  //TODO:PlayerModule FUNCTION(IIFE)

  const playerModule = (function(){
    playerOneMarkerInput.addEventListener('input', validateMarkers);
    playerTwoMarkerInput.addEventListener('input', validateMarkers);
    const createPlayer = (name,marker) => {
      if(typeof name !== 'string'){
        throw new Error('Invalid name, try again, with letters this time...')
      }
      if (marker !== 'X' && marker !== 'O'){
        marker='';
      }
      return {name, marker};
    };

    function validateMarkers() {
      const playerOneMarker = playerOneMarkerInput.value.toUpperCase();
      const playerTwoMarker = playerTwoMarkerInput.value.toUpperCase();
    
      if (playerOneMarker === playerTwoMarker) {
        submitButton.disabled = true;
      } else {
        submitButton.disabled = false;
      }
    }

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
      getPlayerNames,
      validateMarkers
    };
  })();


  //GameModule FUNCTION(IIFE)

  const gameModule = (function(){
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

  // Function to check tie state.
    function checkTieState() {
    let counter = 0
    const grid = gameBoard.getGameBoard();

    for (let i = 0; i < grid.length; i++) {
    if (grid[i].value === ""){
    counter++;
    } 
  }

    if(counter === 0) {
    gameBoard.resetBoard();
    console.log("You Drew, Game Over!")
    console.log("Board Reset...")
    return true
    }
  return false;
  }

    // Function to check GameBoard for a win state
    function checkWinState() {
      const gameBoardArray = gameBoard.getGameBoard();
    
      for (let row = 0; row < 3; row++) {
        if (
          gameBoardArray[row * 3].value !== "" &&
          gameBoardArray[row * 3].value === gameBoardArray[row * 3 + 1].value &&
          gameBoardArray[row * 3].value === gameBoardArray[row * 3 + 2].value
        ) {
          return true;
        }
      }
    
      for (let col = 0; col < 3; col++) {
        if (
          gameBoardArray[col].value !== "" &&
          gameBoardArray[col].value === gameBoardArray[col + 3].value &&
          gameBoardArray[col + 3].value === gameBoardArray[col + 6].value
        ) {
          return true;
        }
      }
    
      if (
        gameBoardArray[0].value !== "" &&
        gameBoardArray[0].value === gameBoardArray[4].value &&
        gameBoardArray[4].value === gameBoardArray[8].value
      ) {
        return true;
      }
    
      if (
        gameBoardArray[2].value !== "" &&
        gameBoardArray[2].value === gameBoardArray[4].value &&
        gameBoardArray[4].value === gameBoardArray[6].value
      ) {
        return true;
      }
    
      return false;
    }

// To see if there is a Draw/Win state on gameBoard.
    function checkGameState() {
    const isTie = checkTieState();
    if (isTie) {
    gameBoard.resetBoard();
    console.log("You Drew! Game Over!");
    console.log("Board reset...");
      return null;
  }

  const isWin = checkWinState();
  if (isWin) {
    return currentPlayer;
  } else {
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


// uiModule FUNCTION(IIFE)

const uiModule = (function() {
  let playerOne;
  let playerTwo;
  let playerOneScore = 0;
  let playerTwoScore = 0;

  function initGame() {

    const firstPlayer = gameModule.firstMove(playerOne, playerTwo);
    console.log(`${firstPlayer.name} goes first!`);
    console.log(firstPlayer.marker);

    gameModule.setCurrentPlayer(firstPlayer);
    activePlayer.textContent = gameModule.getCurrentPlayer().name;
  }

    function handleFormSubmit(event) {
      event.preventDefault();

      const { playerOneName, playerTwoName, playerOneMarker, playerTwoMarker } = playerModule.getPlayerNames();

      playerOne = playerModule.createPlayer(playerOneName, playerOneMarker);
      playerTwo = playerModule.createPlayer(playerTwoName, playerTwoMarker);

      initGame();

    }

  playerForm.addEventListener('submit', handleFormSubmit);

  const displayGameBoard = () => {
    console.log(gameBoard.getGameBoard());
  }

  //Event listener for cell selection click.
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
      if (winner === playerOne){
        playerOneScore++;
      } else {
        playerTwoScore++;
      }
      updateScoreboard();
      //other actions to be performed on a win HERE!!!!
      gameModule.setCurrentPlayer(currentPlayer === playerOne ? playerTwo : playerOne);
      console.log("Game board after reset:");
      console.log(gameBoard.getGameBoard());
      gameBoard.resetBoard();
    } else {
      gameModule.setCurrentPlayer(currentPlayer === playerOne ? playerTwo : playerOne);
      activePlayer.textContent = gameModule.getCurrentPlayer().name;
    }

    gameModule.checkGameState();

    console.log(`Current player: ${gameModule.getCurrentPlayer().name}`);
    console.log(`Current player's marker: ${gameModule.getCurrentPlayer().marker}`);
  };

  gridContainer.addEventListener("click", handleCellClick);

  const updateScoreboard = function(){
    const scoreboardElement = document.getElementById("scoreboard");
    scoreboardElement.innerHTML = `${playerOne.name} Score: ${playerOneScore}<br><br>${playerTwo.name} Score: ${playerTwoScore}\n`
  }

  return {
    //TODO:Expose public methods and properties
    displayGameBoard,
    initGame,
  };
})();

})();