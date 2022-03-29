import {
  WIN,
  DRAW,
  LOSS,
  PLAYER_1,
  PLAYER_2,
  TILE_PLAYER_1,
  TILE_PLAYER_2,
} from "./Types";

export class MiniMax {
  constructor(board, player, depth = 0) {
    this.bestTurn = {};

    this.minimax(board, player, depth);
  }

  getBestTurn() {
    return this.bestTurn;
  }

  minimax(board, player, depth = 0) {
    // Determine available turns
    let availableSpots = [];

    board.state.forEach((row, i) => {
      row.forEach((tile, j) => {
        if (board.isTileEmpty(j, i)) {
          availableSpots.push({
            x: j,
            y: i,
          });
        }
      });
    });

    //   console.log(availableSpots);

    if (availableSpots.length < 1) {
      const winner = board.checkWinner();
      // AI is ALWAYS 2nd player
      if (winner === TILE_PLAYER_1) {
        return player === TILE_PLAYER_2 ? WIN : LOSS;
      } else if (winner === TILE_PLAYER_2) {
        return player === TILE_PLAYER_2 ? LOSS : WIN;
      } else {
        return DRAW;
      }
    }

    let maxValue = Number.NEGATIVE_INFINITY;

    availableSpots.forEach(({ x, y }) => {
      const newBoard = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );

      const newPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;

      newBoard.makeTurn(x, y, player, false);

      let turn = this.minimax(newBoard, newPlayer, depth + 1);

      newBoard.setTileEmpty(x, y);

      if (-turn > maxValue) {
        maxValue = -turn;
        // console.log(maxValue, x, y);

        if (depth === 0) {
          this.bestTurn = { x, y };
          console.log("BEST TURN: ", this.bestTurn, maxValue);
        }
      }
    });

    //   console.log(maxValue);

    return maxValue;
  }
}
