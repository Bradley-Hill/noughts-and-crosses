# noughts-and-crosses
Tic-Tac-Toe if the american must.....Project for The Odin Project

set up basic framework of the html, basic global styling sketched in and ... 
- 03/05/2023

Have written gameCell, GameBoard and PlayerFactory functions, creating objects for the game board with gameCell function, the factory function that will create the players and the GameBoard with a getBoard method to report the state of the array containing the 'cells'. 
- 04/05/2023

Added validateMarkers function and eventlistener for the validation of teh form details. 
started gameLogic function, initGame function is mostly finished but may need a few more methods added. 
- 05/05/2023

Spent a while changing order of functions and the IIFE's and changing the different scopes and closures etc, still not quite getting it right but I am understanding closures and encapsulating functions better. And what to return from them! - 07/05/2023

Moved the firstMove function into globalscope, it will only be temporary I hope, but its at least got the game logic flowing.now to look at the other game logic functions. - 08/05/2023

Starting the Javascript again from scratch, I aim to be more structured in my approach and more modular in my design, and for better clarity and lisibility of the code. - 10/05/2023

Rebuilt the script, currently working, the cells display the player markers after being clicked, the objects property value is changed and used to check for a tie state. The win state is checked for by looking for three repeating markers. Misclicks are covered with validations. Next things to add are mostly cosmetic, a scoreboard perhaps, CSS in gneeral to make it look prettier. - 14/05/2023

Slogged through some debugging regarding the validation of the markers, solved by disabling the submit button if the choice of markers is the same. Added a scoreboard that will display player names and scores after the first win. No score changes with a tie. Time to start styling - 15/05/2023

Finished styling the game enough to make it look pretty and polished enough. - 20/05/2023