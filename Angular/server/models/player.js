

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

  module.exports = Player;
