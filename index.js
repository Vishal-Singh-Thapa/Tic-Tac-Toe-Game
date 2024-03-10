const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    // initially grid ki sari values empty rhengi
    gameGrid = ["","","","","","","","",""];
    // button ko hide krwana h

    //UI update krna h jab new game button pr click krenge
    //har grid k cell ko empty kr denge, reset ho jayega UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // Green colour ko bhi hatana h
        boxes[index].classList.remove("win");
    })

    newGameBtn.classList.remove("active");
    // initially current player-X likha ayega upar game-info m
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Call this function when the game is firstly launched
initGame();

// This function is responsible for 
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    // UI update 
    gameInfo.innerText = `Current Player - ${currentPlayer}`; 
}

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position) => {
        // gamegrid must not be empty and all the values must be equal
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
                
                // If winner is x
                if(gameGrid[position[0]] === "X"){
                    answer = "X";
                }
                else{
                    answer = "O";
                }
                
                // jab hume winner mil jayega to pointer hta denge sab boxes s taki winner ek hi aye 
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                // Mark green colour on winning boxes
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    })

    // If answer is non empty, it means we have a winner
    // game info m winner show hoga and new game wala button active ho jayega
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // Check for draw
    let count = 0;
    gameGrid.forEach( (index) => {
        if(index !== ""){
            count++;
        }
    })
    if(count == 9){
        gameInfo.innerText = `Draw Game!!`;
        newGameBtn.classList.add("active");
        return;
    }
}

// clicks ko handle krega 
function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        // Is line s, jab cell m element dal jayega tab cursor us cell m pointer nahi banega, default styling rhegi
        boxes[index].style.pointerEvents = "none";

        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

// har box m event listner lga diya, index is used to know which box was clicked
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);