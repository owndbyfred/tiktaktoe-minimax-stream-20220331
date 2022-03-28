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

        this.makeTurn(coordinates[0], coordinates[1]);
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
}
