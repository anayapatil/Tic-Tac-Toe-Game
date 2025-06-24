let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // turn of playerX or playerO

const winPatterns = [
    [0, 1, 2], // horizontal win patterns
    [3, 4, 5], 
    [6, 7, 8],  
    [0, 3, 6], // vertical win patterns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonal win patterns
    [2, 4, 6],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.remove("show");
    msgContainer.classList.add("hide");
    boxes.forEach((box) => {
        box.classList.remove("x");
        box.classList.remove("o");
        box.classList.remove("win");
    });
    document.querySelector("main").classList.remove("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            box.classList.add("o"); 
            turnO = false;
        
        } else {
            box.innerText = "X";
            box.classList.add("x"); 
            turnO = true;
            
        }
        box.disabled = true;
        if(checkDraw()) {
            showDraw();
        }
        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// const showWinner = (winner) => {
//     msg.innerHTML = `${winner} Wins!`;
//     msgContainer.classList.remove("hide");
//      msgContainer.classList.add("show");
//     disableBoxes();
// }

// const showDraw = () => {
//     msg.innerHTML = `Draw!`;
//     msgContainer.classList.remove("hide");
//     disableBoxes();
//     document.querySelector("main").classList.add("hide");
// }

// const checkWinner = () => {
//     for(let pattern of winPatterns) {
//         // console.log(pattern[0], pattern[1], pattern[1]); // gives pattern index numbers
//         // console.log(boxes[pattern[0]].innerHTML,
//         //     boxes[pattern[1]].innerHTML,
//         //     boxes[pattern[2]].innerHTML
//         // ) gives value at each box x/o

//         pos1Val = boxes[pattern[0]].innerHTML;
//         pos2Val = boxes[pattern[1]].innerHTML;
//         pos3Val = boxes[pattern[2]].innerHTML;

//         if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
//             if(pos1Val === pos2Val && pos2Val === pos3Val) {
//                 console.log("winner", pos1Val);
//                 showWinner(pos1Val);
//                 // resetBtn.classList.add("hide");
//                 // boxes.forEach((box) => {
//                 //     box.classList.add("hide");
//                 // });
//                 document.querySelector("main").classList.add("hide");
//             }
//         } 
//     }
// }

// const checkDraw = () => {
//     for(let box of boxes) {
//         if(box.textContent === "" ) {
//             return false;
//         }
//     }
//     return true;
// }

// newGameBtn.addEventListener("click", resetGame);
// resetBtn.addEventListener("click", resetGame);

const showWinner = (winner) => {
    msg.innerHTML = `${winner} Wins!`;
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("show");
    disableBoxes();

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (
            boxes[a].innerText === boxes[b].innerText &&
            boxes[b].innerText === boxes[c].innerText &&
            boxes[a].innerText !== ""
        ) {
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");
            break;
        }
    }

    document.querySelector("main").classList.add("hide");
};

const showDraw = () => {
    msg.innerHTML = `Draw!`;
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("show");
    disableBoxes();
    document.querySelector("main").classList.add("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let pos1Val = boxes[a].innerText;
        let pos2Val = boxes[b].innerText;
        let pos3Val = boxes[c].innerText;

        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }
};

const checkDraw = () => {
    return [...boxes].every(box => box.innerText !== "");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);