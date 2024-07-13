
const createPlayer = (name, mark) => {

    let choiceArray = [];

    return {
        name,
        mark,
        choiceArray
    }
}


const Game = () => {

    let gameCount = 0;
    let currentPlayerIndex = 0;
    let gameWon = false;

    const player1name = prompt("Player 1's name: ");
    const player2name = prompt("Player 2's name: ");

    let players = [
        createPlayer(player1name, "X"),
        createPlayer(player2name, "O"),
    ]

    const dashboard =document.querySelector("p");
    dashboard.textContent = `${player1name}'s Turn`;


    const handleClick = (event) => {

        gameCount++;
        addMark();
        players[currentPlayerIndex].choiceArray.push(Number(event.target.id));
        checkForWinner(players[currentPlayerIndex].choiceArray);
        if (!gameWon) {
            if(gameCount == 9){
                dashboard.textContent = "No one wins! It's a tie."
            } else {
            switchPlayer();
            }
        }
    }

    const switchPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        dashboard.textContent =`${players[currentPlayerIndex].name}'s Turn`;
    }

    const reset = () => {
        gameCount = 0;
        currentPlayerIndex = 0;
        gameWon = false;
        dashboard.textContent = `${player1name}'s Turn`;
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.addEventListener("click", handleClick, {once:true})
        });

        cells.forEach(cell => {
            const img = cell.querySelector("img");
            if (img) {
            cell.removeChild(img);
            }
        })

        players.forEach(player => player.choiceArray = []);
        currentPlayerIndex = 0;
        console.log("Game reset")
    }

    const resetBtn = document.querySelector(".restart");
    resetBtn.addEventListener("click",reset)

    const start = () => {

        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.addEventListener("click", handleClick, { once: true});
        })

    }

    const checkForWinner = (array) => {

        const winParameter = [
            [0, 1, 2],
            [0, 3, 6],
            [6, 7, 8],
            [2, 5, 8],
            [1, 4, 7],
            [3, 4, 5],
            [0, 4, 8],
            [2, 4, 6]
        ]
    
        for (let i=0; i< winParameter.length; i++){
            let combination = winParameter[i];
    
            if (combination.every(element => array.includes(element))){
                dashboard.textContent=`${players[currentPlayerIndex].name} Wins!`;
                gameWon = true;
                removeEvents();
                break
            } 
        }
    
    }

    const addMark = () => {
        const crossImg = document.createElement("img");
        const circleImg = document.createElement("img");
        crossImg.src = "cross.png";
        circleImg.src = "circle.png";
        const cell = document.getElementById(`${event.target.id}`);
        if (currentPlayerIndex === 0){
            cell.appendChild(crossImg)
        } else {
            cell.appendChild(circleImg)
        }
    }

    const removeEvents = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.removeEventListener("click", handleClick);
        })
    }

    return {
        start,
        reset,
    }

}

const game = Game();
game;
game.start();
