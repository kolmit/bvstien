const httpServer = require("http").createServer();
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
 * Models
 */
class Player {
  constructor(name) {
    this.name = name;
  }

  rename(newName){
    this.name = newName;
  }
}

/**
 * Connection & Waiting Room
 */
const MAX_PLAYERS = 2;
var playerList = [];
var playerMap = new Map();
var lastPlayedIndex = 0;
const NB_LINE = 5;
const NB_COLUMN = 5;
var boardGrid = [[]];// = [[-1, -1, -1 ], [-1, -1, -1], [-1, -1, -1]];


io.on('connection', (socket) => {
  console.log('New connection ! ', socket.id);
  let playerName = "Player " + playerMap.size;

  io.emit("connected", {
    idPlayer: playerName
  });

  playerList.push(socket);
  playerMap.set(socket, new Player(playerName));
  socket.join("Room1");

  broadcastInformationsGame();

  if (playerList.length === MAX_PLAYERS){
    for (let x = 0 ; x < NB_LINE ; x++){
      boardGrid[x] = [];
      for (let y = 0 ; y < NB_COLUMN ; y++){
        console.log("(" + x + ';' + y + ")");
        boardGrid[x][y] = -1;
      }
    }
    startGame();
  }

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
    playerMap.get(socket).rename(newName);
    broadcastInformationsGame();
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
      checkWin(boardGrid);
      nextPlayer();
    }
    return ack(thisPlayIsPossible);
  });
}); 

function checkWin(boardGrid) {
  /*for (let x = 0 ; x < 3 ; x++){
    if (boardGrid[x])
  }*/
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

function nextPlayer(){
  let playerIndex = lastPlayedIndex++;

  var keySocket = Array.from(playerMap.keys())[playerIndex];
  console.log("C'est au joueur "+playerIndex+": " + keySocket.id);
  keySocket.to("Room1").emit("youHaveToPlay"); 

  if (playerIndex === playerList.length - 1){
    lastPlayedIndex = 0;
  }
}
