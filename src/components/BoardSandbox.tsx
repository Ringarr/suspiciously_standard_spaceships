import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/board.scss";
import "../styles/cell.scss";
import "../styles/ship.scss";
import { buildShipMap, key, rayCellsFrom, SIZE } from "../game/utils";

export const BoardSandbox: FC = () => {
  const gameState = useSelector((state: any) => state.game);
  const shipMap = React.useMemo(() => buildShipMap(gameState.ships), [gameState.ships]);
  const [selectedShipId, setSelectedShipId] = useState<string | null>(
    "a1"
  );

  const selected = React.useMemo(() => {
    if (!selectedShipId) return null;
    return gameState.ships.find((s:any) => s.id === selectedShipId) ?? null;
  }, [selectedShipId, gameState.ships]);

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
