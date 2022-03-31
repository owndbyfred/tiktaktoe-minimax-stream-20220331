import { WIN, DRAW, LOSS, PLAYER_1, PLAYER_2 } from "./Types";

export class MiniMax {
  constructor(board, player, depth = 0) {
    this.board = board;
    this.savedTurn = {};

    this.max(player, depth);
  }

  addTurn({ x, y, value }) {
    if (!this.turns[`${value}`]) this.turns[`${value}`] = [];

    this.turns[`${value}`].push({ x, y });
  }

  getBestTurn() {
    return this.savedTurn;
  }

  max(player, depth) {
    const availableSpots = this.getAvailableSpots();

    let maxValue = Number.NEGATIVE_INFINITY;

    if (availableSpots.length <= 0 || this.board.checkWinner()) {
      return this.valueBoardState();
    }

    availableSpots.forEach((spot) => {
      const { x, y } = spot;

      this.board.makeTurn(x, y, player, false);

      const value = this.min(this.getNewPlayer(player), depth + 1);

      this.board.setTileEmpty(x, y);

      if (value > maxValue) {
        maxValue = value;

        if (depth === 0) {
          this.savedTurn = { x, y };
        }
      }
    });

    return maxValue;
  }

  min(player, depth) {
    const availableSpots = this.getAvailableSpots();

    let minValue = Number.POSITIVE_INFINITY;

    if (availableSpots.length <= 0 || this.board.checkWinner()) {
      return this.valueBoardState();
    }

    availableSpots.forEach((spot) => {
      const { x, y } = spot;

      this.board.makeTurn(x, y, player, false);

      const value = this.max(this.getNewPlayer(player), depth + 1);

      this.board.setTileEmpty(x, y);

      if (value < minValue) {
        minValue = value;
      }
    });

    return minValue;
  }

  getAvailableSpots() {
    let availableSpots = [];

    this.board.state.forEach((row, i) => {
      row.forEach((tile, j) => {
        if (this.board.isTileEmpty(j, i)) {
          availableSpots.push({
            x: j,
            y: i,
          });
        }
      });
    });

    return availableSpots;
  }

  getNewPlayer(player) {
    return player === PLAYER_1 ? PLAYER_2 : PLAYER_1;
  }

  valueBoardState() {
    const winner = this.board.checkWinner();

    if (winner === PLAYER_1) {
      return LOSS;
    } else if (winner === PLAYER_2) {
      return WIN;
    } else {
      return DRAW;
    }
  }
}
