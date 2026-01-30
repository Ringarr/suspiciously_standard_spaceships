import { Dir, Ship, ShotMode, Vec } from "./types";

const SIZE = 8;

const key = (x: number, y: number) => {
  return `${x},${y}`;
}

const wrap = (n: number) => {
  return ((n % SIZE) + SIZE) % SIZE;
}
const wrapPos = (p: Vec): Vec => {
  return { x: wrap(p.x), y: wrap(p.y) };
}
const add = (a: Vec, b: Vec): Vec => {
  return { x: a.x + b.x, y: a.y + b.y };
}

const DIR_VEC: Record<Dir, Vec> = {
  N: { x: 0, y: -1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: 1 },
  W: { x: -1, y: 0 },
};

const leftOf = (d: Dir): Dir => {
  return d === "N" ? "W" : d === "W" ? "S" : d === "S" ? "E" : "N";
}
const rightOf = (d: Dir): Dir => {
  return d === "N" ? "E" : d === "E" ? "S" : d === "S" ? "W" : "N";
}
const shotDir = (facing: Dir, mode: ShotMode): Dir => {
  if (mode === "FRONT") return facing;
  if (mode === "LEFT") return leftOf(facing);
  return rightOf(facing);
}

const buildShipMap = (ships: Ship[]) => {
  const map = new Map<string, Ship>();
  for (const s of ships) map.set(key(s.pos.x, s.pos.y), s);
  return map;
}

const rayCellsFrom = (ship: Ship, mode: ShotMode): Vec[] => {
  // all tiles along the line excluding the shooter tile
  const dir = shotDir(ship.facing, mode);
  const dv = DIR_VEC[dir];
  const out: Vec[] = [];
  let p = ship.pos;

  for (let i = 1; i <= SIZE - 1; i++) {
    p = wrapPos(add(p, dv));
    out.push(p);
  }
  return out;
}

export { key, wrap, wrapPos, add, DIR_VEC, leftOf, rightOf, shotDir, buildShipMap, rayCellsFrom, SIZE };