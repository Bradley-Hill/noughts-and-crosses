(function(){

  //TODO:Define elements from HTML for Script
  const playerForm = document.getElementById('player-form');
  const gridContainer = document.getElementById('grid-container');



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

        div.addEventListener("click", function(){
          console.log(grid[getIndex(cell.row, cell.col)]);
        });
      }
    }
    function getIndex(row, col) {
      return row  + col;
    }
  
    //TODO:FUNCTION initalizes GameBoard
      //******Not necessary???******

    //TODO:FUNCTION to update GameBoard after players turn

    //TODO:FUNCTION to verify if chosen cell is empty

    //TODO:FUNCTION to check if all cells are full/marked
 
    return {
      //TODO:Expose public methods and properties
      getGameBoard: function() {
        return grid
      }
    };
  })();

  //TODO:PlayerModule FUNCTION(IIFE)
  const playerModule = (function(){
    //TODO:Factory Function to create player objects with Name and Marker
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


    //TODO:Function to get players name from form

    //TODO:Function to get players marker from form

    return {
      //TODO:Expose public methods and properties
      createPlayer,
      getPlayerNames
    };
  })();

  //TODO:GameModule FUNCTION(IIFE)
  const gameModule = (function(){
    //TODO:Function to switch/select active player
    function firstMove(playerOne, playerTwo){
      let firstPlayer = playerOne;
      if (Math.random() > 0.5 ){
        firstPlayer = playerTwo;
      }
      return firstPlayer;
    }

    //TODO:Function to check GameBoard for a win state

    //TODO:Function to check GameBoard for a tie state(GameOver)

    return {
      //TODO:Expose public methods and properties
      firstMove,
    };
  })();

  //TODO:UIModule FUNCTION(IIFE)
  const uiModule = function(){
    //TODO:Event listener for form submit click.
    //TODO:initGame function.
    const initGame = (function(){
      const {playerOneName, playerTwoName,playerOneMarker, playerTwoMarker} = playerModule.getPlayerNames();

      const playerOne = playerModule.createPlayer(playerOneName, playerOneMarker);
      const playerTwo = playerModule.createPlayer(playerTwoName, playerTwoMarker);

      const firstPlayer = gameModule.firstMove(playerOne,playerTwo);
      console.log(`${firstPlayer.name} goes first!`);

      //LEAVING SPACE for any extra steps needed in initilisation


    });
    
    playerForm.addEventListener('submit',function(event){
      event.preventDefault();
      initGame();
    });

    //TODO:FUNCTION to display gameBoard to User.
    const displayGameBoard = () => {
      console.log(gameBoard.getGameBoard());
    }

    const board = gameBoard.getGameBoard();
console.log(board);

    //TODO:Event listener for cell selection click.

    //TODO:FUNCTION to handle user clicks on cells

    //TODO:FUNCTION to display GameBoard to user.
      //------Already acheived from first function?------

    //TODO:FUNCTION to display Winner to user.

    //TODO:FUNCTION to display current player to user.

    return {
      //TODO:Expose public methods and properties
      displayGameBoard: displayGameBoard,
      initGame: initGame,
      getPlayerOne: () => playerOne,
      getPlayerTwo: () => playerTwo,
    };
  }();
})();


