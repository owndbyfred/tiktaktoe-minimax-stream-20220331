import {
  PLAYER_1,
  PLAYER_2,
  SYMBOL_PLAYER_1,
  SYMBOL_PLAYER_2,
  TILE_EMPTY,
} from "./Types";

export default class Board {
  constructor() {
    this.tileEles = document.querySelectorAll(".Board__Cell");
    this.state = [
      [TILE_EMPTY, TILE_EMPTY, TILE_EMPTY],
      [TILE_EMPTY, TILE_EMPTY, TILE_EMPTY],
      [TILE_EMPTY, TILE_EMPTY, TILE_EMPTY],
    ];
    this.playerTurn = PLAYER_1;

    if (this.tileEles) this.init();
  }

  init() {
    this.tileEles.forEach((tileEle) => {
      tileEle.addEventListener("click", ({ target }) => {
        const coordinates = target.getAttribute("data-index").split("-");

        if (!this.makeTurn(coordinates[0], coordinates[1])) {
          alert("Bitte wähle ein anderes Feld!");
        }
      });
    });
  }

  makeTurn(x, y) {
    if (!this.isTileEmpty(x, y)) return false;

    // Update state
    this.state[y][x] = this.playerTurn;

    // Update UI
    const tileEle = this.getTileEle(x, y);

    const playerSymbol =
      this.playerTurn === PLAYER_1 ? SYMBOL_PLAYER_1 : SYMBOL_PLAYER_2;

    tileEle.innerHTML = playerSymbol;
    // Next player's turn
    this.playerTurn = this.playerTurn === PLAYER_1 ? PLAYER_2 : PLAYER_1;

    // Check if winner:
    const winner = this.checkWinner();
    if (winner) {
      alert(`Spieler ${winner} hat gewonnen!`);
    }

    return true;
  }

  isTileEmpty(x, y) {
    return this.state[y][x] === TILE_EMPTY;
  }

  getTileEle(x, y) {
    return Array.from(this.tileEles).find(
      (tileEle) => tileEle.getAttribute("data-index") === `${x}-${y}`
    );
  }

  checkWinner() {
    for (let i = 0; i < this.state.length; i++) {
      for (let j = 0; j < this.state[i].length; j++) {
        const playerOnTile = this.state[i][j];

        if (playerOnTile === TILE_EMPTY) continue;

        let success = true;

        // Check horizontal line
        this.state[i].forEach((tile) => {
          if (tile !== playerOnTile) {
            success = false;
            return;
          }
        });

        if (success) {
          return playerOnTile;
        }

        success = true;

        // Check vertical line
        for (let k = 0; k < this.state.length; k++) {
          if (this.state[k][j] !== playerOnTile) {
            success = false;
            break;
          }
        }

        if (success) {
          return playerOnTile;
        }
      }
    }

    // Check diagonals
    /*
        1 0 0 
        0 1 0
        0 0 1
    */

    let playerOnTile = this.state[0][0];
    let success = true;

    if (playerOnTile !== TILE_EMPTY) {
      if (
        !(
          this.state[1][1] === playerOnTile && this.state[2][2] === playerOnTile
        )
      ) {
        success = false;
      }
    }

    if (success) {
      return playerOnTile;
    }

    /*
        0 0 1 
        0 1 0
        1 0 0
    */

    playerOnTile = this.state[0][2];
    success = true;

    if (playerOnTile !== TILE_EMPTY) {
      if (
        !(
          this.state[1][1] === playerOnTile && this.state[2][0] === playerOnTile
        )
      ) {
        success = false;
      }
    }

    if (success) {
      return playerOnTile;
    }

    return null;
  }
}
