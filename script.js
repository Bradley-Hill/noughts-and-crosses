(function(){

  //TODO:Define elements from HTML for Script
  const playerForm = document.getElementById('player-form');
  const gridContainer = document.getElementById('grid-container');

  //TODO:GameBoard FUNCTION(IIFE)
  const gameBoard = (function(){
    //TODO:array of 2D 3x3 Grid for cells
    const grid = [];

    for(let i=0; i<grid.length; i++) {
      for(let j; j<grid[i].length; j++) {
        const cell = {
          row:i,
          col:j,
          value:"",
        };
        grid.push(cell);
        }
      }

    //TODO:FUNCTION initalizes GameBoard

    //TODO:FUNCTION to update GameBoard after players turn

    //TODO:FUNCTION to verify if chosen cell is empty

    //TODO:FUNCTION to check if all cells are full/marked
    
    return {
      //TODO:Expose public methods and properties
    };
  })();

  //TODO:PlayerModule FUNCTION(IIFE)
  const playerModule = (function(){
    //TODO:Factory Functionto create player objects with Name and Marker

    //TODO:Function to get players name from form

    //TODO:Function to get players marker from form

    return {
      //TODO:Expose public methods and properties
    };
  })();

  //TODO:GameModule FUNCTION(IIFE)
  const gameModule = (function(){
    //TODO:Function to switch active player

    //TODO:Function to check GameBoard for a win state

    //TODO:Function to check GameBoard for a tie state(GameOver)

    return {
      //TODO:Expose public methods and properties
    };
  })();

  //TODO:UIModule FUNCTION(IIFE)
  const uiModule = (function(){
    //TODO:Event listener for form submit click.
      //TODO:Validation checks on form(markers)

    //TODO:Event listener for cell selection click.

    //TODO:FUNCTION to handle user clicks on cells

    //TODO:FUNCTION to display GameBoard to user.

    //TODO:FUNCTION to display Winner to user.

    //TODO:FUNCTION to display current player to user.

    return {
      //TODO:Expose public methods and properties
    };
  })();

})();
