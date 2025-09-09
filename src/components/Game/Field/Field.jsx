// Field.jsx (оптимизированная)
import './styles.css'
import { GridElement } from '../Grid/GridElement'
import { useState, useEffect } from 'react';
import { generatePath } from './pathGenerator';

export const Field = ({ isActive, rows, cols }) => {
    const [gridData, setGridData] = useState(Array(rows).fill().map(() => Array(cols).fill(null)));

    useEffect(() => {
        const path = generatePath(rows, cols);
        
        // Обновляем только те клетки, которые есть в path
        const newGrid = Array(rows).fill().map(() => Array(cols).fill(null));
        path.forEach(point => {
            newGrid[point.y][point.x] = point;
        });
        
        setGridData(newGrid);
    }, [rows, cols]);

    const renderGrid = () => {
        const gridElements = [];
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = gridData[y][x];
                const key = `${y}-${x}`;
                
                if (cell && cell.type === 'start') {
                    gridElements.push(
                        <div key={key} className='grid-element'>
                            <img src="src/assets/pipe-end.svg" alt="start" />
                        </div>
                    );
                } else if (cell && cell.type === 'end') {
                    gridElements.push(
                        <div key={key} className='grid-element'>
                            <img src="src/assets/pipe-end.svg" alt="end" />
                        </div>
                    );
                } else if (cell) {
                    gridElements.push(
                        <GridElement 
                            key={key}
                            type={cell.type}
                            rotation={cell.rotation || 0}
                            isActive={isActive}
                        />
                    );
                } else {
                    gridElements.push(
                        <div key={key} className='grid-element empty' />
                    );
                }
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