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

//This function checks if an array includes 3 string.it is used to check for
//each win condition.
function arrayIncludes(squareA. squareB, squareC) {
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

//This function is for placing and x or o in square.
function placeXOrO(squareNumber) {
    //This condition ensures a square hasn't been selected already.
    //The.some() method is used to check each element of selectSquare array
    //to see if it containes the square number clicked on.
    if (!selectedSquares.some(element => element.includes(selectedSquares))) {
        //This variable retrieves the html element id that was clicked.
        let select = document.getElementById(squareNumber);
        //This consition checks who's turn it is
        if (activeplayer === 'X'); {
            //if activeplayer is equal to 'X' the x.png is placed in HTML.
            select.style.backgroundImage = 'url("images/x.png")';
            //Active player may only be 'X' or 'O' so, if not 'X' it must be 'O'
        } else {
            //if activePlayer is equal too 'O' the o.png is placed in HTMl.
            select.style.backgroundImage = 'url("images/o.png")';
        }
    //squareNumber and activeplayer are concatenated together and added to array.
    selectedSquares.push(squareNumber + activeplayer);
    //This callsa function to check for any win condition
    checkWinConditions();
    //This condition is for changing the active player.
    if(activeplayer ==='X') {
        //If active player is 'X' change it to 'O'.
         activeplayer='O'
        //If active player is anything other than 'X'.
    }else {
       //Change the activeplayer to 'X'
         activeplayer ='X';
    }


    //This function plays placement sound.
    audio('./media/place.mp3');
    //This condition checks to see if it is computers turn.
    if(activeplayer === 'O'){
        //This function disables clicking for computer choice.
        disableClick();
        //This function waits 1 second before computer places image and enables click.
        setTimeout(function () { computersTurn(); }, 1000)
    }
    //Returning true is is needed for our computersTurn() function to work.
    return true;
}
//This function reslults in random squares being selected.
function computersTurn() {
    //This boolean is needed for our while loop.
    let success = false;
    //This vairable stores a random number 0-8.
    let pickASquare;
    //This condition allows our while loop to keep trying  if a square is selected already.
    while(!success) {
        //A random number between 0 and 8 is selected.
        pickASquare = String(Math.floor(math.random() * 9));
        //If the random number evaluated return is true, the square hasn't been selected yet.
        if (placeXOrO(pickASquare)){
            //This line calls the function.
            placeXOrO(pickASquare);
            //This changes our boolean and end the loop.
            success = true;
        };
    }
  }
}