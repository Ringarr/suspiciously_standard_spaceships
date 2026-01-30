
import { GridCell } from "./GridCell";

const SIZE = 8;

export const GameBoard = () => {
  const cells = [];

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      cells.push(
        <GridCell
          key={`${x}-${y}`}
          x={x}
          y={y}
        />
      );
    }
  }

  return <div className="board">{cells}</div>;
}
