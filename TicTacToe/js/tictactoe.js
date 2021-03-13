let activePlayer = 'X';
let selectedSquare = [];

function placeXOrO(squareNumber) {
    if (!selectedSquare.some(element => element.includes(squareNumber))) {
        let select = document.getElementById(squareNumber);
        if (activePlayer === 'X') {
            select.style.backgroundImage = 'url("media/x.png")';
        } else {
            select.style.backgroundImage = 'url("media/o.png")';
        }
        selectedSquare.push(squareNumber + activePlayer);
        checkWinCondition();
        if (activePlayer === 'X') {
            activePlayer = 'O';
        } else {
            activePlayer = 'X';
        }
        audio('./media/place.mp3');
        if(activePlayer === 'O'){
            disableClick();
            setTimeout(function (){ computersTurn(); }, 1000)
        }
        return true;
    }

    function computersTurn() {
        let success = false;
        let pickASquare;
        while(!success){
            pickAsquare = String(Math.floor(Math.random() *9));
            if (placeXOrO(pickASquare)){
                placeXOrO(pickASquare);
                success = true;
            };
        }
    }
}

function checkWinCondition() {
    if     (arrayIncludes('0X','1X','2X')) {drawWineLine(50,100,558,100)}
    else if(arrayIncludes('3X','4X','5X')) {drawWineLine(50,304,558,304)}   
    else if(arrayIncludes('6X','7X','8X')) {drawWineLine(50,508,558,508)}
    else if(arrayIncludes('0X','3X','6X')) {drawWineLine(100,50,100,558)}
    else if(arrayIncludes('1X','4X','7X')) {drawWineLine(304.50,304,558)}
    else if(arrayIncludes('2X','5X','8X')) {drawWineLine(508,50,508,558)}
    else if(arrayIncludes('6X','4X','2X')) {drawWineLine(100,508,510,90)}
    else if(arrayIncludes('0X','4X','8X')) {drawWineLine(100,100,520,520)}
    else if(arrayIncludes('0O','1O','2O')) {drawWineLine(50,100,558,100)}
    else if(arrayIncludes('3O','4O','5O')) {drawWineLine(50,304,558,304)}
    else if(arrayIncludes('6O','7O','8O')) {drawWineLine(50,508,558,508)}
    else if(arrayIncludes('0O','3O','6O')) {drawWineLine(100,50,100,558)}
    else if(arrayIncludes('1O','4O','7O')) {drawWineLine(304,50,304,558)}
    else if(arrayIncludes('2O','5O','8O')) {drawWineLine(508,50,508,558)}
    else if(arrayIncludes('6O','4O','2O')) {drawWineLine(100,508,510,90)}
    else if(arrayIncludes('0O','4O','8O')) {drawWineLine(100,100,520,520)}
    else if (selectedSquare.length >= 9) {
        audio('./media/tie.mp3');
        setTimeout(function () { resetGame(); }, 1000);
    }
}
function arrayIncludes(squareA, squareB, squareC) {
    const a = selectedSquare.includes(squareA)
    const b = selectedSquare.includes(squareB)
    const c = selectedSquare.includes(squareC)
    if (a === true && b === true && c === true) { return true }
    } 


function resetGame() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i))
    }
    selectedSquare = [];
}

function audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
}

function drawWineLine(coordX1,coordY1,coordX2,coordY2) {
    const canvas = document.getElementById('win-lines')
    const c = canvas.getContext('2d');
     let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        x = x1,
        y = y1;

        function animateLineDrawing() {
            const animationLoop = requestAnimationFrame(animateLineDrawing);
            c.clearRect(0, 0, 608, 608)
            c.beginPath();
            c.moveTo(x1, y1)
            c.lineTo(x, y)
            c.lineWidth = 10;
            c.strokeStyle = 'rgba(70, 255, 33, .8)';
            c.stroke();
            if (x1 <= x2 && y1 <= y2) {
               if (x < y2) {x += 10;}
               if (y < y2) { y += 10;}
               if (x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop); }
            }
        }

        function clear() {
            const animationLoop = requestAnimationFrame(clear);
            c.clearRect(0, 0, 608, 608);
            cancelAnimationFrame(animationLoop);
            
        }
        disableClick();
        audio('./media/winGame.mp3');
        animateLineDrawing();
        setTimeout(function () { clear(); resetGame(); }, 1000);
}

function disableClick() {
    body.style.pointEvent = 'none';
    setTimeout(function() {body.style.pointEvent = 'auto';}, 1000)
}
function resetGame() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i))
        square.style.backgroundImage = ''
    }
    selectedSquare = [];
}

