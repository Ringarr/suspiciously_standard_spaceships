import { createSlice } from '@reduxjs/toolkit';
import { Ship } from './types';

const initialShipState: Ship[] = [
  { id: "a1", owner: "A", pos: { x: 1, y: 6 }, facing: "N", hp: 3 },
  { id: "a2", owner: "A", pos: { x: 2, y: 7 }, facing: "E", hp: 2 },
  { id: "b1", owner: "B", pos: { x: 6, y: 1 }, facing: "S", hp: 3 },
  { id: "b2", owner: "B", pos: { x: 5, y: 0 }, facing: "W", hp: 2 },
];

const initialState = {
  size: 8,
  ships: initialShipState,
  selectedShipId: "a1",
  uiMode: "IDLE",
  shotMode: "FRONT",
};


const gamestateSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
        setMode: (state, action) => {
            const mode = action.payload;
            state.uiMode = mode;
        },
        selectShip: (state, action) => {
            const shipId = action.payload;
            state.selectedShipId = shipId;
        },
        moveShipd: (state, action) => {
            const { shipId, newPos } = action.payload;
            const ship = state.ships.find(s => s.id === shipId);
            if (ship) {
                ship.pos = newPos;
            }
        },
        rotateShip: (state, action) => {
            const { shipId, newFacing } = action.payload;
            const ship = state.ships.find(s => s.id === shipId);
            if (ship) {
                ship.facing = newFacing;
            }
        },
        setShotMode: (state, action) => {
            const mode = action.payload;
            state.shotMode = mode;
        },
  },
});


export const {  } = gamestateSlice.actions;

export default gamestateSlice.reducer;