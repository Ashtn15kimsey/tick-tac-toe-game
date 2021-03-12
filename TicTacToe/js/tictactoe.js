//This function parses the selectSquare array to search for win conditions.
//drawWineLine function is called to draw line if condition is met.
function checkWinConditions() {
    //X 0,1,2 condition.
    if   (arrayIncludes('OX', '1X', '2X')) { drawWinLine(50, 100, 558,100) }
    //X3,4,5 condition.
    else if (arrayIncludes('3X','4X','5X')) { drawWinLine(50, 304, 558,304) }
    //X6,7,8 condition.
    else if (arrayIncludes('6X','7X','8X')) { drawWinLine(50, 508, 558,508) }
    //X0,3,6 condition.
    else if (arrayIncludes('0X','3X','6X')) { drawWinLine(100,50,100,558) }
    //X1,4,7 condition.
    else if (arrayIncludes('1X','4X','7X')) { drawWinLine(304,50,304,558) }
    //X2,5,8 condition.
    else if (arrayIncludes('2X','5X','8X')) { drawWinLine(508,50,508,558) }
    //X6,4,2 condition.
    else if (arrayIncludes('6X','4X','2X')) { drawWinLine(100,508,510,90) }
    //X0,4,8 condition.
    else if (arrayIncludes('0X','4X','8X')) { drawWinLine(100,100,520,520) }
    //o0,1,2 condition.
    else if (arrayIncludes('0o','10','20')) { drawWinLine(50,100,558,100) }
    //o3,4,5 condition.
    else if (arrayIncludes('3o','4o','5o')) { drawWinLine(50,304,558,304) }
    //o6,7,8 condition.
    else if (arrayIncludes('6o','7o','8o')) { drawWinLine(50,508,558,508) }
    //o0,3,6 condition.
    else if (arrayIncludes('0o','3o','60')) { drawWinLine(100,50,100,558) }
    //o1,4,7 condition.
    else if (arrayIncludes('1o','4o','7o')) { drawWinLine(304,50,304,558) }
    //o2,5,8 condition.
    else if (arrayIncludes('2o','5o','8o')) { drawWinLine(508,50,508,558) }
    //o6,4,2 condition.
    else if (arrayIncludes('6o','4o','2o')) { drawWinLine(100,508,510,90) }
    //o0,4,8 condition.
    else if (arrayIncludes('0o','4o','8o')) { drawWinLine(100,100,520,520) }
    //This condition checks for tie. If none of the above condition register and 9
    //square are selected the code executes.
    else if (selectedSquares.length >= 9) {
        //This function plays the tie game sound.
        audio('./media/tie.mp3');
        //This function sets a .3 second timer before the resetGame is called.
        setTimeout(function() {resumeGame(); }, 1000);
}
function drawWineLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById('win-lines')
    const c = canvas.getContext('2d');
    let x1 = coordX1;
        x2 = coordY1;
        x2 = coordX2;
        y2 = coordY2;
        x = x1;
        y = y1;
        
        function animateLineDrawing() {
            const animationLoop = requestAnimationFrame(animateLineDrawing);
            c.clearReact(0,0,608,608)
            c.beginPath();
            c.moveTo(x1,y)
            c.lineTo(x,y)
            c.lineWidth = 10;
            c.strokeStyle = 'rgba(70,225,33,.8)';
            c.stroke();
            if (x1 <= x2 && y1 <= y2) {
                if (x<x2){x += 10; }
                if (y<y2) {y += 10;}
                if (x >= x2) && y >= y2) { cancelAnimationFrame(animationLoop); }
            }
            if (x1 <=x2 && y1 >=y2) {
                if (x<x2) {x += 10; }
                if (y > y2) {y -= 10;}
                if (x >= x2 && y <= y2) {cancelAnimationFrame(animationLoop); }

            }
        }
     
        function clear() {
            const animationLoop = requestAnimationFrame(clear);
            c.clearReact(0,0,608,608);
            cancelAnimationFrame(animationLoop);
        }
        disableClick();
        audio('./media/winGame.mp3');
        animateLineDrawing();
        setTimeout(function () {clear(); resetGame(); }, 1000);
}

function disableClick() {
    body.style.pointEvents = 'none';
    setTimeout(function () {body.style.pointEvents = 'auto';}, 1000)
}
//This function checks if an array includes 3 string.it is used to check for
//each win condition.
function arrayIncludes(squareA,squareB,squareC) {
    //These 3 variables will be used to check for 3 ina row.
    const a=selectedSquares.includes(squareA)
    const b=selectedSquares.includes(squareB)
    const c= selectedSquares.includes(squareC)
    //If the 3 variables we pass are all included in our array true is
    //returned and our else if condition executes the drawWinLine function.
    if (a=== true && b === true && c === true) {return true}
  }
}


//This variable keeps track of whose turn it is.
let activeplayer='X';
//This array stores array of moves.We use this to determine win conditions.
let selectedSquares=[];

//Adjust setTimeout function time might result in bugs.
let activeplayer = 'X';//This variable keeps track of whos turn it is.
let selectedSquares = [];//This array stores an array of moves.We use this to determine win condition.

function placeXOrO(squareNumber) {//This function is for plscing an x or o in a square.
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //This condition ensures a square hasn't be selected already.The.some() method is used to check each element of selectedsquare array to see if it contains the square number clicked on.
        let select = document.getElementById(squareNumber);//This variable retrieves the html element id that was clicked.
        if (activeplayer === 'X') {//This ondition checks who's turn it is.
            select.style.backgroundImage = 'url("images/x.png")';//If active player is equal to 'X', the x.png is placed in HTML.
    } else {//Active player may only be 'X' or 'O' so, if not 'X' it must be 'O'
         select.style.backgroundImage = 'url("images/o.png")';//If activePlayer is equal to 'O', the o.png is placed in HTML.
    }
    selectedSquares.push(squareNumber + activeplayer);//squareNumber and activeplayer are concatenated together and added array.
    checkWinConditions();//This calls a function to check for any win condition.More on this below.
    if (activeplayer === 'X') {//This condition is for changing the active player.
        activeplayer = 'O';//If active player is 'X' change to 'O'.
    } else {//If active player is anything other than 'X'.
        activeplayer = 'X';//Change the actuveplayer to 'X'
    }   
    audio('./media/place.mp3'); //This function plays placement sound.
    if(activeplayer === 'O'){//This condition checks to see if it is computers turn.
        setTimeout(function(){computersTurn(); }, 1000)//This function waits 1 second before computer places image and enables click.
    }
    return true;//Returning true is needed for our computerTurn() function to work.
} 

function computersTurn() {//This function results in a random square being selected.
    let success = false;
    let pickAsquare;
    while(!success){
        pickAsquare = string(Math.floor(Math.random() * 9));
        if (placeXOrO(pickAsquare)){
            placeXOrO(pickAsquare);
            success = true;
        };
     }
  }
}
    

    