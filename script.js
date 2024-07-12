

const createPlayer = (name, mark) => {

    let choiceArray = [];

    return {
        name,
        mark,
        choiceArray
    }
}


const Game = () => {

    let clickCount = 0;
    let currentPlayerIndex = 0;
    let players = [
        createPlayer("Player 1", "X"),
        createPlayer("Player 2", "O"),
    ]



    const handleClick = (event) => {
        
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
        players[currentPlayerIndex].choiceArray.push(Number(event.target.id));
        checkForWinner(players[currentPlayerIndex].choiceArray);
        switchPlayer();
        clickCount++;
        if (clickCount === 9) {
            console.log("No one wins")
            reset();
        }
    }

    const switchPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const reset = () => {
        clickCount = 0;
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.addEventListener("click", handleClick, {once:true})
        });
        players.forEach(player => player.choiceArray = []);
        currentPlayerIndex = 0;
        console.log("Game reset")
    }

    const start = () => {

        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.addEventListener("click", handleClick, { once: true});
        })

    }

    const checkForWinner = (array) => {

        console.log(array);

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
                console.log(`${players[currentPlayerIndex].name} wins!`)
                break
            }
        }
    
    }

    return {
        start,
        reset,
    }

}

const game = Game();
game.start()
