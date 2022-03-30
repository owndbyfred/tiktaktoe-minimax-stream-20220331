import { MiniMax } from "./MiniMax";
import {
  PLAYER_1,
  PLAYER_2,
  SYMBOL_PLAYER_1,
  SYMBOL_PLAYER_2,
  TILE_EMPTY,
  TILE_PLAYER_1,
  TILE_PLAYER_2,
} from "./Types";

export default class Board {
  constructor(state = null) {
    this.tileEles = document.querySelectorAll(".Board__Cell");
    this.state = state;
    this.isRunning = true;

    if (this.tileEles && !state) this.init();
  }

  init() {
    this.state = [
      [TILE_EMPTY, TILE_EMPTY, TILE_EMPTY],
      [TILE_EMPTY, TILE_EMPTY, TILE_EMPTY],
      [TILE_EMPTY, TILE_EMPTY, TILE_EMPTY],
    ];

    this.tileEles.forEach((tileEle) => {
      tileEle.addEventListener("click", ({ target }) => {
        const coordinates = target.getAttribute("data-index").split("-");

        if (!this.makeTurn(coordinates[0], coordinates[1], PLAYER_1)) {
          alert("Bitte wähle ein anderes Feld!");
        } else {
          if (this.isRunning) {
            const miniMax = new MiniMax(this, PLAYER_2);

            const { x, y } = miniMax.getBestTurn();

            this.makeTurn(x, y, TILE_PLAYER_2);
          }
        }
      });
    });
  }

  getState() {
    return this.state;
  }

  makeTurn(x, y, player, isHumanTurn = true) {
    if (!this.isTileEmpty(x, y)) return false;

    if (isHumanTurn) console.log(x, y);
    // Update state
    this.state[y][x] = player;

    // Update UI
    if (isHumanTurn) {
      const tileEle = this.getTileEle(x, y);

      const playerSymbol =
        player === PLAYER_1 ? SYMBOL_PLAYER_1 : SYMBOL_PLAYER_2;

      tileEle.innerHTML = playerSymbol;
    }

    // Check if winner:
    const winner = this.checkWinner();
    if (winner && isHumanTurn) {
      alert(`Spieler ${winner} hat gewonnen!`);
    }

    if (winner && isHumanTurn) this.isRunning = false;

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

  setTileEmpty(x, y) {
    this.state[y][x] = TILE_EMPTY;
  }

  checkWinner() {
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
    } else {
      success = false;
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
    } else {
      success = false;
    }

    if (success) {
      return playerOnTile;
    }

    // Check horizontals
    /*
        1 1 1 
        0 0 0
        0 0 0
    */

    for (let i = 0; i < 3; i++) {
      playerOnTile = this.state[i][0];
      success = true;

      if (playerOnTile !== TILE_EMPTY) {
        if (
          !(
            this.state[i][1] === playerOnTile &&
            this.state[i][2] === playerOnTile
          )
        ) {
          success = false;
        }
      } else {
        success = false;
      }

      if (success) {
        return playerOnTile;
      }
    }

    // Check verticals
    /*
        1 0 0 
        1 0 0
        1 0 0
    */

    for (let i = 0; i < 3; i++) {
      playerOnTile = this.state[0][i];
      success = true;

      if (playerOnTile !== TILE_EMPTY) {
        if (
          !(
            this.state[1][i] === playerOnTile &&
            this.state[2][i] === playerOnTile
          )
        ) {
          success = false;
        }
      } else {
        success = false;
      }

      if (success) {
        return playerOnTile;
      }
    }

    return null;
  }
}
