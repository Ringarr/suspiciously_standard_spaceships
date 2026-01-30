import React, { FC, useState } from "react";
import "../styles/board.scss";
import "../styles/cell.scss";
import "../styles/ship.scss";
import { Ship } from "../game/types";
import { buildShipMap, key, rayCellsFrom, SIZE } from "../game/utils";





const SHIPS: Ship[] = [
  { id: "a1", owner: "A", pos: { x: 1, y: 6 }, facing: "N", hp: 3 },
  { id: "a2", owner: "A", pos: { x: 2, y: 7 }, facing: "E", hp: 2 },
  { id: "b1", owner: "B", pos: { x: 6, y: 1 }, facing: "S", hp: 3 },
  { id: "b2", owner: "B", pos: { x: 5, y: 0 }, facing: "W", hp: 2 },
];



export const BoardSandbox: FC = () => {
  const shipMap = React.useMemo(() => buildShipMap(SHIPS), []);
  const [selectedShipId, setSelectedShipId] = useState<string | null>(
    "a1"
  );

  const selected = React.useMemo(() => {
    if (!selectedShipId) return null;
    return SHIPS.find((s) => s.id === selectedShipId) ?? null;
  }, [selectedShipId]);

  const highlights = React.useMemo(() => {
    const map = new Map<string, "front" | "left" | "right">();
    if (!selected) return map;

    for (const p of rayCellsFrom(selected, "FRONT")) map.set(key(p.x, p.y), "front");
    for (const p of rayCellsFrom(selected, "LEFT")) map.set(key(p.x, p.y), "left");
    for (const p of rayCellsFrom(selected, "RIGHT")) map.set(key(p.x, p.y), "right");
    return map;
  }, [selected]);

  const cells: React.ReactNode[] = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const ship = shipMap.get(key(x, y));
      const hl = highlights.get(key(x, y));

      cells.push(
        <div className="cell" key={`${x}-${y}`}>
          <div className="cell__coord">
            {x},{y}
          </div>

          {hl && <div className={`cell__highlight cell__highlight--${hl}`} />}

          {ship && (
            <button
              type="button"
              className={[
                "ship",
                ship.owner === "A" ? "ship--a" : "ship--b",
                `ship--facing-${ship.facing.toLowerCase()}`,
                selectedShipId === ship.id ? "ship--selected" : "",
              ].join(" ")}
              onClick={() => setSelectedShipId(ship.id)}
              title={`${ship.id} (${ship.owner})`}
            >
              <span className="ship__body" />
              <span className="ship__hp">{ship.hp}</span>
            </button>
          )}
        </div>
      );
    }
  }

  return (
    <div className="screen">
      <div className="header">
        <h1>Suspiciously Standard Spaceships</h1>
        <p>Click a ship: selection ring + front/side firing previews.</p>
      </div>

      <div className="board-wrap">
        <div className="board">{cells}</div>
      </div>

      <div className="footer">
        <div className="chip">
          Selected: <b>{selectedShipId ?? "none"}</b>
        </div>
        {selected && (
          <div className="chip">
            Facing: <b>{selected.facing}</b>
          </div>
        )}
      </div>
    </div>
  );
}
