
import './styles.css'
import { GridElement } from '../Grid/GridElement'
import { useState, useEffect } from 'react';
import { generatePath } from './pathGenerator';

export const Field = ({ isActive, rows, cols }) => {
    const [gridData, setGridData] = useState(Array(rows).fill().map(() => Array(cols).fill(null)));

    useEffect(() => {
        const path = generatePath(rows, cols);
        
        const newGrid = Array(rows).fill().map(() => Array(cols).fill(null));
        path.forEach(point => {
            newGrid[point.y][point.x] = point;
            //console.log(point.rotation)
        });
        
        setGridData(newGrid);
    }, [rows, cols]);

    const renderGrid = () => {
        const gridElements = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = gridData[y][x];
                const key = `${y}-${x}`;
                //console.log("hi")
                gridElements.push(
                    <GridElement 
                        key={key}
                        type={cell ? cell.type : ""}
                        initialRotation={cell ? cell.rotation : 0}
                        isActive={isActive}
                    />
                );
            }
        }       
        return gridElements;
    };

    return (
        <div 
            className='game-field' 
            style={{ 
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`
            }}
        >
            {renderGrid()}
        </div>
    );
};