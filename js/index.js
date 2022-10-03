   /*----- constants -----*/   
// our players and the corresponding letters 
const PLAYERS = {
   '0' : ' ',
   '1': '❌',
   '-1': '⭕'
}
// array of winning combos based on the board array
const WINNING_COMBOS = [
   [0,1,2], // top left to right
   [0,3,6], // left down
   [1,4,7], // middle down
   [2,5,8], // right down
   [2,4,6], // SW/NE diag
   [3,4,5], // middle left to right
   [6,7,8], // bottom left to right
   [0,4,8], // SE/NW diag
   // for our check winner we want to see if the board at these indexes add up to 3 or -3
];
/*----- state variables -----*/
// what we will want to store our data
let board; // consist of 2D array [columns][rows]
let turn; // 1/-1 
let winner; // will equal 1/-1/'T'/null depending on the checkWinner function

/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const playAgainButton = document.querySelector('button');

const topLeft = document.getElementById('0');
const topMiddle = document.getElementById('1');
const topRight = document.getElementById('2');
const centerLeft = document.getElementById('3');
const centerMiddle = document.getElementById('4');
const centerRight = document.getElementById('5');
const bottomLeft = document.getElementById('6');
const bottomMiddle = document.getElementById('7');
const bottomRight = document.getElementById('8');
 // use the rest operator to make an array of the objects
/*----- event listeners -----*/
playAgainButton.addEventListener('click', init);
document.getElementById('board').addEventListener('click', handleClick);

   /*----- functions -----*/   
init();

function init() {
   // initialize the board state, whose turn it is, messages, ect...
   //  then call render
   board = [0,0,0,0,0,0,0,0,0];
   turn = 1;
   winner = null;
   render();
}

function handleClick(event) {
   let boardIdx = parseInt(event.target.id);
   if (board[boardIdx]) return; // if the board state is not 0 then the function immediatley returns
   board[boardIdx] = turn;
   winner = checkWinner();
   turn *= -1;
   render();
}

function checkWinner() {
   for (let i = 0; i < WINNING_COMBOS.length; i++) {
      if (Math.abs((board[WINNING_COMBOS[i][0]]) + (board[WINNING_COMBOS[i][1]]) + (board[WINNING_COMBOS[i][2]])) === 3) {
         return board[WINNING_COMBOS[i][0]]
      };
   };
   if (!board.some((x)=> x === 0)) return 'T';
}

function render () {
   renderBoard();
   renderMessage();
   renderControls();
}
function renderBoard() {
   //iterate through each sub array
   board.forEach(function(tile, tileId) {
      document.getElementById(`${tileId}`).innerText = PLAYERS[tile];
   });
}
function renderMessage() {
   if (winner === -1 || winner === 1) {
      messageEl.innerText = `${PLAYERS[turn * -1]} Wins!`;
   } else if (winner === 'T') {
      messageEl.innerText = "It's a Draw";
   } else {
      messageEl.innerText = `${PLAYERS[turn]}'s turn`;
   };
}
function renderControls() {
   playAgainButton.style.visibility = winner ? 'visible' : 'hidden';
}
   