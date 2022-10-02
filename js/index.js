   /*----- constants -----*/   
// our players and the corresponding letters 
   const PLAYERS = {
   '0': ' ',
   '1': '❌',
   '-1': '⭕'
}

/*----- state variables -----*/
// what we will want to store our data
let board; // consist of 2D array [columns][rows]
let turn; // 1/-1 
let winner; // will equal 1/-1/'T'/null depending on the checkWinner function

/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const playAgainButton = document.querySelector('button');
/*----- event listeners -----*/


   /*----- functions -----*/   
init();

   function init() {
   // initialize the board state, whose turn it is, messages, ect...
   //  then call render
   board = [
   [0,0,0],
   [0,0,0],
   [0,0,0]
   ];
   turn = 1;
   winner = null;
   render();
}

function render () {
   renderBoard();
   renderMessage();
   renderControls();
}
function renderBoard() {
   //iterate through each sub array
   board.forEach(function(row, rowIdx) {
      row.forEach(function(cellVal, colIdx) {
         let cellId = `c${colIdx}r${rowIdx}`;
         let cellEl = document.getElementById(cellId);
         cellEl.innerText = PLAYERS[cellVal];
      })
   });
}
function renderMessage() {
   if (turn === 1) {
      messageEl.innerText = "Player One's Turn";
   } else {
      messageEl.innerText = "Player Two's Turn";
   };
}
function renderControls() {
   playAgainButton.style.visibility = winner ? 'visible' : 'hidden';
}








   