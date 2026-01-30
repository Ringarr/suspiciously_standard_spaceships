import React from "react";
import "../styles/board.scss";
import "../styles/cell.scss";
import "../styles/ship.scss";

type PlayerId = "A" | "B";
type Dir = "N" | "E" | "S" | "W";

type Vec = { x: number; y: number };

type Ship = {
  id: string;
  owner: PlayerId;
  pos: Vec;
  facing: Dir;
  hp: number;
};

const SIZE = 8;

const SHIPS: Ship[] = [
  { id: "a1", owner: "A", pos: { x: 1, y: 6 }, facing: "N", hp: 3 },
  { id: "a2", owner: "A", pos: { x: 2, y: 7 }, facing: "E", hp: 2 },

  { id: "b1", owner: "B", pos: { x: 6, y: 1 }, facing: "S", hp: 3 },
  { id: "b2", owner: "B", pos: { x: 5, y: 0 }, facing: "W", hp: 2 },
];

function key(x: number, y: number) {
  return `${x},${y}`;
}

function buildShipMap(ships: Ship[]) {
  const map = new Map<string, Ship>();
  for (const s of ships) map.set(key(s.pos.x, s.pos.y), s);
  return map;
}

export const InitialBoard: React.FC = () => {
  const shipMap = React.useMemo(() => buildShipMap(SHIPS), []);

  const cells: React.ReactNode[] = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const ship = shipMap.get(key(x, y));
      cells.push(
        <div className="cell" key={`${x}-${y}`}>
          {/* optional coordinate debug */}
          <div className="cell__coord">{x},{y}</div>

          {ship && (
            <div
              className={[
                "ship",
                ship.owner === "A" ? "ship--a" : "ship--b",
                `ship--facing-${ship.facing.toLowerCase()}`,
              ].join(" ")}
              title={`${ship.id} (${ship.owner})`}
            >
              <div className="ship__body" />
              <div className="ship__hp">{ship.hp}</div>
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div className="screen">
      <div className="header">
        <h1>Suspiciously Standard Spaceships</h1>
      </div>

      <div className="board-wrap">
        <div className="board">{cells}</div>
      </div>
    </div>
  );
}
