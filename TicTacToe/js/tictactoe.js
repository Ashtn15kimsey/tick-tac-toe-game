let activeplayer = 'X';
let selectedsquare = [];

function placeXOrO(squareNumber) {
    if (!selectedsquares.some(element => element.includes(squareNumber))) {
        let selected = document.getElementById(squareNumber);
        if (activeplayer === 'X') {
            selected.style.background = 'url("images/x.png")';
        } else{
            select.style.background = 'url("images/o.png")';
        }
        selectedsquare.push(squareNumber + activeplayer);
        checkWincondition();
        if (activeplayer === 'x') {
            activeplayer = 'o';
        } else {
            activeplayer = 'x';
        }
        Audio('./media/place.mp3');
        if(activeplayer === 'o'){
            disableClick();
            setTimeout(function (){ computersTurn(); }, 1000)
        }
        return true;
    }

    function computersTurn() {
        let success = false;
        let pickSquare;
        while(!success){
            pickAsquare = String(math.floor(Math.random() *9));
            if (placeXOrO(pickAsquare)){
                placeXOrO(ppickAsquare);
                success = true;
            };
        }
    }
}

function checkWincondition() {
    if     (arrayIncludes('0x','1x','2x')) {drawWineLine(50,100,100) }
    else if(arrayIncludes('3x','4x','5x')) {drawWineLine(50,304,558,304)}   
    else if(arrayIncludes('6x','7x','8x')) {drawWineLine(50,508,558,508)}
    else if(arrayIncludes('0x','3x','6x')) {drawWineLine(100,50,100,558)}
    else if(arrayIncludes('1x','4x','7x')) {drawWineLine(304.50,304,558)}
    else if(arrayIncludes('2x','5x','8x')) {drawWineLine(508,50,508,558)}
    else if(arrayIncludes('6x','4x','2x')) {drawWineLine(100,508,510,90)}
    else if(arrayIncludes('0x','4x','8x')) {drawWineLine(100,100,520,520)}
    else if(arrayIncludes('0o','1o','2o')) {drawWineLine(50,100,558,100)}
    else if(arrayIncludes('3o','4o','5o')) {drawWineLine(50,304,558,304)}
    else if(arrayIncludes('6o','7o','8o')) {drawWineLine(50,508,558,508)}
    else if(arrayIncludes('0o','3o','60')) {drawWineLine(100,50,100,558)}
    else if(arrayIncludes('1o','4o','7o')) {drawWineLine(304,50,304,558)}
    else if(arrayIncludes('2o','5o','8o')) {drawWineLine(508,50,508,558)}
    else if(arrayIncludes('6o','4o','2o')) {drawWineLine(100,508,510,90)}
    else if(arrayIncludes('0o','4o','8o')) {drawWineLine(100,100,520,520)}
    else if (selectedsquare.length >= 9) {
        Audio('./media/tie.mp3');
        setTimeout(function () { resetGame(); }, 1000);
    }
}
function arrayIncludes(squareA, squareB, squareC) {
    const a = selectedsquare.includes(squareA)
    const b = selectedsquare.includes(squareB)
    const c = selectedsquare.includes(squareC)
    if (a === true && b === true && c === true) { return true }
    } 


function resetGame() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(string(i))
    }
    selectedsquare = [];
}

function Audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
}

function drawWineLine(coordX1,coordY1,coordX2,coordY2) {
    const c = canvas.getElementById('win-lines')
    const c = canvas.getContext('2d');
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        x = x1,
        y = y1,

        function animateLineDrawing() {
            const animateLoop = requestAnimationFrame(animateLineDrawing);
            c.clearReact(0, 0, 608, 608)
            c.beginPath();
            c.moveTo(x1, y1)
            c.lineTo(x, y)
            c.lineWidth = 10;
            c.strokeStyle = 'rgba(70, 255, 33, .8)';
            c.stroke();
            if (x1 <= x2 && y1 <= y2) {
               if (x < y2) {x += 10;}
               if (y < y2) { y += 10;}
               if (x >= x2 && y >= y2) {cancelAnimationFrame(animateLoop); }
            }
        }

        function clear() {
            const animateLoop = requestAnimationFrame(clear);
            c.clearReact(0, 0, 608, 608);
            cancelAnimationFrame(animateLoop);
            
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