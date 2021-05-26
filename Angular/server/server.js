const httpServer = require("http").createServer(); 
const Player = require('./models/player.js');
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://192.168.1.123:4201", 
    "192.168.1.22"],
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
});

httpServer.listen(3000, '192.168.1.123', () => {
  console.log('listen 3000');
});



/**
 * Connection & Waiting Room
 */
const MAX_PLAYERS = 2;
var playerList = [];
var playerMap = new Map();
var lastPlayedIndex = 0;
const NB_LINE = 10;
const NB_COLUMN = 10;
const WIN_GOAL = 5;
const DEFAULT_VALUE = -1;
var boardGrid = [[]];// = [[-1, -1, -1 ], [-1, -1, -1], [-1, -1, -1]];


io.on('connection', (socket) => {
  console.log('New connection ! ', socket.id);
  let playerName = "Player " + playerMap.size;

  io.emit("connected", {
    idPlayer: playerName
  });

  joinRoom();

  /**
   * Déconnexion
   */
  socket.on("disconnect", () => {
    let leavingPlayerIndex = playerList.findIndex(player => player === socket);
    playerMap.delete(socket);

    console.log("Le joueur " + leavingPlayerIndex + " a quitté la partie.");
    if (leavingPlayerIndex > -1) {
      playerList.splice(leavingPlayerIndex, 1);
    }
    console.log("Liste des joueurs restant :");
    console.log("\n---------------\n");
    for (p of playerList){
      console.log(p.id);
    }
    console.log("\n---------------\n");

    broadcastInformationsGame();
  })

  socket.on("rename", (newName) => {
    if (playerMap.get(socket)) {
      playerMap.get(socket).rename(newName);
      broadcastInformationsGame();
    }
  });

  socket.on("tictactoe:playagain", () => {
    console.log("OKAY LETS PLAY AGAIN !");
    joinRoom();
  });

  /**
   * Quand un joueur a joué :
   */
  socket.on('played', function (positions, ack) {
    const xPlayed = positions.positionX;
    const yPlayed = positions.positionY;

    console.log(positions.symbolNumber + ' a joué : ' + xPlayed + ';' + yPlayed);
    let thisPlayIsPossible = boardGrid[xPlayed][yPlayed] < 0;

    if (thisPlayIsPossible) {
      /** On signale à l'autre joueur ce qui a été joué */
      playerList[lastPlayedIndex].to("Room1").emit("opponentPlayed", {
        positionX: xPlayed,
        positionY: yPlayed,
        symbolNumber: positions.symbolNumber // TODO : Changer pour ne plus que ça soit le client qui envoie son symbole
      });

      boardGrid[xPlayed][yPlayed] = positions.symbolNumber;
      if (checkWin(boardGrid, positions.symbolNumber)) {
        endGame(positions.symbolNumber);
      } else {
        nextPlayer();
      }
      
    }
    return ack(thisPlayIsPossible);
  });


  function joinRoom(sessionPlayerName) {  
    playerList.push(socket);
    playerMap.set(socket, new Player(sessionPlayerName ? sessionPlayerName : playerName));
    socket.join("Room1");
    
    broadcastInformationsGame();
  
    if (playerList.length === MAX_PLAYERS){
      for (let x = 0 ; x < NB_LINE ; x++){
        boardGrid[x] = [];
        for (let y = 0 ; y < NB_COLUMN ; y++){
          boardGrid[x][y] = -1;
        }
      }
      startGame();
    }
  }
}); 


function checkWin(boardGrid, potentialWinner) {
  if (checkHorizontal(boardGrid) || checkVertical(boardGrid) || checkDiagonal(boardGrid) || checkDiagonal2(boardGrid)) {
    console.log("WINNER IS ", potentialWinner);
    return true;
  }
}

function checkHorizontal(boardGrid) {
  let colNumber = 0
  while(colNumber + (WIN_GOAL-1) < NB_COLUMN){
    for (let ligne = 0 ; ligne < NB_LINE ; ligne++){

      let cellWithSameColorInARow = 1;
      for (let winDeep = 1 ; winDeep < WIN_GOAL+1 ; winDeep++){
        if (boardGrid[ligne][colNumber + (winDeep-1)] !== DEFAULT_VALUE && 
          boardGrid[ligne][colNumber + (winDeep-1)] === boardGrid[ligne][colNumber + winDeep]) 
        {
          cellWithSameColorInARow++;
          if (cellWithSameColorInARow === WIN_GOAL) {
            return true;
          }
        } else {
          cellWithSameColorInARow = 0;
        }
      }
    }
    colNumber++;
  }

  return false;
}

function checkVertical(boardGrid) {
  let colNumber = 0;
  while(colNumber < NB_COLUMN){
    for (let ligne = 0 ; ligne < NB_LINE; ligne++){

      let cellWithSameColorInARow = 1;
      for (let winDeep = 1 ; winDeep < WIN_GOAL+1 ; winDeep++){

        if (boardGrid[ligne + (winDeep-1)] && boardGrid[ligne + winDeep] &&
          boardGrid[ligne + (winDeep-1)][colNumber] !== DEFAULT_VALUE && 
          boardGrid[ligne + (winDeep-1)][colNumber] === boardGrid[ligne + winDeep][colNumber]) 
        {
          cellWithSameColorInARow++;
          if (cellWithSameColorInARow === WIN_GOAL) {
            cellWithSameColorInARow = 0;
            return true;
          }
        } else {
          cellWithSameColorInARow = 0;
        }
      }
    }
    colNumber++;
  }
}

function checkDiagonal2(boardGrid) {

  for (let colNumber = 0 ; colNumber < NB_COLUMN ; colNumber++) {
    for (let ligne = 0 ; ligne < NB_LINE ; ligne++) {

      let cellWithSameColorInARow = 1;

      for (let winDeep = 1 ; winDeep < WIN_GOAL+1 ; winDeep++){
          if (boardGrid[ligne + (winDeep-1)]
            && boardGrid[ligne + winDeep]) {

              if (boardGrid[ligne + (winDeep-1)][colNumber - (winDeep-1)] !== DEFAULT_VALUE 
              && boardGrid[ligne + (winDeep-1)][colNumber - (winDeep-1)] === boardGrid[ligne + winDeep][colNumber - winDeep]) {
                cellWithSameColorInARow++;
                if (cellWithSameColorInARow === WIN_GOAL) {
                  return true;
                }
              } else {
                cellWithSameColorInARow = 0;
              }

            }
            
        }
      }
    }
    return false;
}

function checkDiagonal(boardGrid) {

  for (let colNumber = 0 ; colNumber < NB_COLUMN ; colNumber++) {
    for (let ligne = 0 ; ligne < NB_LINE ; ligne++) {

      let cellWithSameColorInARow = 1;

      for (let winDeep = 1 ; winDeep < WIN_GOAL+1 ; winDeep++){

        if (boardGrid[ligne + winDeep] 
            && boardGrid[ligne + (winDeep-1)][colNumber + (winDeep-1)] !== DEFAULT_VALUE 
            && boardGrid[ligne + (winDeep-1)][colNumber + (winDeep-1)] === boardGrid[ligne + winDeep][colNumber + winDeep]) {
            
            cellWithSameColorInARow++;
            if (cellWithSameColorInARow === WIN_GOAL) {
              return true;
            }
          } else {
            cellWithSameColorInARow = 0;
          }
        }
      }
    }
    return false;
}

/**
 * Tout ce qui concerne les endpoints d'information (la liste des joueurs, ...)
 * @param {} socket 
 */
function broadcastInformationsGame() {
  io.to("Room1").emit('getPlayerList', {
    playerListSent: Array.from(playerMap.values())
  });
}


function startGame(){
  io.to("Room1").emit("tictactoe:initBoard", boardGrid);
  for (let symbolNumber = 0 ; symbolNumber < playerList.length ; symbolNumber++){
    playerList[symbolNumber].to("Room1").emit("gameIsStarting", {
      symbolNumber
    });
  }
  
  nextPlayer();
} 

function endGame(winnerSymbol) {
  playerList = [];
  io.to("Room1").emit("tictactoe:endGame", winnerSymbol);
}

function nextPlayer(){
  let playerIndex = lastPlayedIndex++;

  var keySocket = Array.from(playerMap.keys())[playerIndex];
  if (keySocket) {
    console.log("C'est au joueur "+playerIndex+": " + keySocket.id);
    keySocket.to("Room1").emit("youHaveToPlay"); 

    if (playerIndex === playerList.length - 1){
      lastPlayedIndex = 0;
    }
  }
  
}
