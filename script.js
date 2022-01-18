console.log("this is 2048 game");

let gameOn = true;
document.onkeydown = checkKey;
let score=0;
let highscore=0;
let gridOn=false;
let musicOn=true;

const gameMusic = new Audio('music.mp3');
gameMusic.play();
gameMusic.loop = true;

function start() {
    changeColor();
    //loop through all tiles 
    setHighScore();
    changeHighScore();
    score=0;
    for(let i=1;i<=16;i++) {
        document.getElementById("t-"+i).innerHTML = "0";
    }
     newTile();
     newTile();
    gameOn = true;
    document.getElementById("game-over").style.display = "none";
}
start();
changeColor();

// generates new Tiles 
function newTile() {
    let res = [];
    for(let i=1;i<=16;i++) {
        if(document.getElementById("t-"+i).innerHTML == "0"){
            res.push(i);
        }
    }

    if(res.length == 0){
    isGameOver();
     return;
    }
    let newTile = Math.floor(Math.random()*res.length);
    document.getElementById("t-"+res[newTile]).innerHTML = ""+Math.round(Math.random()*1 + 1) * 2;
    changeColor();
}
function isGameOver() {
    const start=[5,9,13];// checking for -1
    const end=[4,8,12];//checking for +1
    for(let i=1;i<=16;i++) {
        if(end.indexOf(i) == -1 && i <= 15 && document.getElementById("t-"+(i)).innerHTML == document.getElementById("t-"+(i+1)).innerHTML) {
            return;
        }
        if(start.indexOf(i) == -1 && i >=2 && document.getElementById("t-"+i).innerHTML == document.getElementById("t-"+(i-1)).innerHTML) {
            return;
        }
        if(i>=5 && document.getElementById("t-"+i).innerHTML == document.getElementById("t-"+(i-4)).innerHTML) {
            return;
        }
        if(i<=12 && document.getElementById("t-"+i).innerHTML == document.getElementById("t-"+(i+4)).innerHTML) {
            return;
        }
    
        if(document.getElementById("t-"+i).innerHTML === "0") {
           return;
        } 
    }
    gameOn=false;
    changeHighScore();
    document.getElementById("game-over").style.display = "block";
    document.getElementById("score").innerHTML = "score : 0";
    changeColor();
    
}

function changeColor() {
    for(let i=1;i<=16;i++) {
        let currelement = document.getElementById("t-"+i)
        if(currelement.innerHTML == "0") {
            currelement.parentElement.style.backgroundColor = "#ee6520";
            currelement.parentElement.style.color = "#ee6520"
        }
        else if(currelement.innerHTML == "2"){
          currelement.parentElement.style.backgroundColor = "#1a94de"
          currelement.parentElement.style.color = "white"
        } else if(currelement.innerHTML == "4") {
          currelement.parentElement.style.backgroundColor = "#c91a0e"
          currelement.parentElement.style.color = "white"
        } else if(currelement.innerHTML == "8") {
            currelement.parentElement.style.backgroundColor = " #d2c624 "
            currelement.parentElement.style.color = "white"
        } else if(currelement.innerHTML == "16") {
            currelement.parentElement.style.backgroundColor = "#901fce"
            currelement.parentElement.style.color = "white"
        } else if(currelement.innerHTML == "32") {
            currelement.parentElement.style.backgroundColor = "#3dd224"
            currelement.parentElement.style.color = "white"
        } else if(currelement.innerHTML == "64") {
            currelement.parentElement.style.backgroundColor = "#25d988"
            currelement.parentElement.style.color = "white"
        } else if(currelement.innerHTML == "128") {
            currelement.parentElement.style.backgroundColor = " #2555d9 "
            currelement.parentElement.style.color = "white"
        } else if(currelement.innerHTML == "256") {
            currelement.parentElement.style.backgroundColor = " #662be4 ";
            currelement.parentElement.style.color = "white"
        } else if(currelement.innerHTML == "512") {
           currelement.parentElement.style.backgroundColor = " #d62be4 "
           currelement.parentElement.style.color = "white"
        } else if(currelement.innerHTML == "1024") {
            currelement.parentElement.style.backgroundColor = " #e42b9f "
            currelement.parentElement.style.color = "white"
         } else if(currelement.innerHTML == "2048") {
            currelement.parentElement.style.backgroundColor = " #e42b79 "
            currelement.parentElement.style.color = "white"
         } 
        
    }
}

// checking for key events
function checkKey(e) {
 e = e || window.event;
 if(e.keyCode == 38) {
     up();
 } 
 else if(e.keyCode == 39) {
     right();
 }
 else if(e.keyCode == 37) {
     left();
 }
 else if(e.keyCode == 40) {
     down();
    }
}

// listening button for grid
document.getElementById('grid-btn').addEventListener('click',()=>{
    if(gridOn) {
        gridOn = false; 
        document.getElementById('grid-btn').innerHTML = "grid ON";
        document.getElementById('game').style.backgroundColor = "#ee6520";
    } else {
        gridOn = true;
        document.getElementById('grid-btn').innerHTML = "grid OFF";
        document.getElementById('game').style.backgroundColor = "#CBAE57";
    }
})

// function gridSetting() {
//     document.getElementById('grid-btn').addEventListener('click',()=>{
//         if(gridOn) {
//             gridOn = false; 
//             document.getElementById('grid-btn').innerHTML = "grid ON";
//             document.getElementById('game').style.backgroundColor = "#ee6520";
//         } else {
//             gridOn = true;
//             document.getElementById('grid-btn').innerHTML = "grid OFF";
//             document.getElementById('game').style.backgroundColor = "#CBAE57";
//         }
//     })
// }
// document.getElementById('music-btn').addEventListener('click',()=>{
//   if(musicOn) {
//       musicOn = false;
//       gameMusic.pause();
//       document.getElementById('music-btn').innerHTML = "music ON"
//   } else {
//       musicOn = true;
//       gameMusic.play();
//       document.getElementById('music-btn').innerHTML = "music OFF"
//   }
// })
// checking for touch events 
let startingX,startingY,movingX,movingY;

function touchStart(event) {
    event.preventDefault();
    startingX = event.touches[0].clientX;
    startingY = event.touches[0].clientY;
}

function touchMove(event) {
    movingX = event.touches[0].clientX;
    movingY = event.touches[0].clientY;
}

function touchEnd() {
    if(startingX+100 < movingX) {
        // console.log('right');
        right();
    } else if (startingX-100 > movingX) {
        // console.log('left');
        left();
    }

    if(startingY+100 < movingY) {
        // console.log('down');
        down();
    } else if(startingY-100 > movingY) {
        // console.log('up');
        up();
    }
}
function left() {
    isGameOver();
    
    row(1,2,3,4);
    row(5,6,7,8);
    row(9,10,11,12);
    row(13,14,15,16);
    
    newTile();
    changeColor();
}
function right() {
   isGameOver();

   row(4,3,2,1);
   row(8,7,6,5);
   row(12,11,10,9);
   row(16,15,14,13);
   newTile();
   changeColor();
}
function down() {
   isGameOver();

   row(13,9,5,1);
   row(14,10,6,2);
   row(15,11,7,3);
   row(16,12,8,4);
   newTile();
   changeColor();
}
function up() {
   isGameOver();

   row(1,5,9,13);
   row(2,6,10,14);
   row(3,7,11,15);
   row(4,8,12,16);
   newTile();
   changeColor();
}

function row(aa,bb,cc,dd) {
   let a = parseInt(document.getElementById("t-"+aa).innerHTML)
   let b = parseInt(document.getElementById("t-"+bb).innerHTML)
   let c = parseInt(document.getElementById("t-"+cc).innerHTML)
   let d = parseInt(document.getElementById("t-"+dd).innerHTML)

   let vals = [];
   let res = [];
   if(a != 0) {
    vals.push(a);
   }
   if(b != 0) {
      vals.push(b); 
   }
   if(c != 0) {
       vals.push(c);
   }
   if(d != 0) {
       vals.push(d);
   }
   for(let i=0;i<vals.length;i++) {
       if(typeof vals[i+1] !== undefined) {
           //exits
           if(vals[i] == vals[i+1]) {
               // merge tiles
               res.push(vals[i]+vals[i+1]);
            //    document.getElementById('score').innerHTML = "score :"+parseInt(document.getElementById('score').innerHTML)+vals[i]+vals[i+1];
               score += vals[i] + vals[i+1];
               document.getElementById('score').innerHTML = "score : "+score; 
              i++; // as we are merging next tile wont be checker
           } else {
               res.push(vals[i]);
           }
       } else {
           // single tile in a row
            res.push(vals[i]);
       }
   }

   let z = 0;
   var inputs = [aa,bb,cc,dd];
//    let input = [a,b,c,d];
   let output = [];
   while(z < res.length) {
    document.getElementById("t-"+inputs[z]).innerHTML = ""+res[z];
    output.push(res[z]);
    z++;
   }
   while(z<4) {
       document.getElementById("t-"+inputs[z]).innerHTML = "0";
       z++;
   }
}

function setHighScore() {
    if(localStorage.getItem("highscore") !== null) {
        highscore =parseInt( localStorage.getItem("highscore"));
        document.getElementById("high-score").innerHTML = "Highscore : "+highscore;
    } else {
        localStorage.setItem("highscore",0);
    }
}
function changeHighScore() {
    if(score > highscore) {
        highscore = score;
        localStorage.setItem("highscore",JSON.stringify(highscore));
    } 
}

function musicSetting() {
    if(musicOn) {
        musicOn = false;
        gameMusic.pause();
        document.getElementById('music-btn').innerHTML = "music ON"
    } else {
        musicOn = true;
        gameMusic.play();
        document.getElementById('music-btn').innerHTML = "music OFF"
    }
}
