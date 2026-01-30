type PlayerId = "A" | "B";
type Dir = "N" | "E" | "S" | "W";
type ShotMode = "FRONT" | "LEFT" | "RIGHT";
type Vec = { x: number; y: number };

type Ship = {
  id: string;
  owner: PlayerId;
  pos: Vec;
  facing: Dir;
  hp: number;
};

export type { PlayerId, Dir, ShotMode, Vec, Ship };