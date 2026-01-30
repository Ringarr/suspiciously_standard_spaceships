import { FC } from "react";
import { useDispatch } from "react-redux";
type GridCellProps = {
    x: number;
    y: number;
};
export const GridCell: FC<GridCellProps> = ({ x, y }) => {
    const dispatch = useDispatch();

    return (
        <div
            className="cell"
            onClick={() => dispatch({ type: "CELL_CLICKED", x, y })}
        >
        </div>
    );
}
