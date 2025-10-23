import './styles.css'
import { GridElement } from '../Grid/GridElement'
import { useState, useEffect, memo } from 'react';
import { generatePath } from './pathGenerator';
import { useDrag, useDrop } from 'react-dnd';

const canConnect = (pipe1, pipe2, direction) => {
    if (!pipe1 || !pipe2)  { 
        return false; 
    }

    const connections = {
        'straight': { 
            0: ['left', 'right'], 
            90: ['top', 'bottom'] 
        },
        'curved': { 
            0: ['left', 'top'], 
            90: ['top', 'right'], 
            180: ['right', 'bottom'], 
            270: ['left', 'bottom'] 
        },
        'tee': {
            0: ['left', 'top', 'right'],
            90: ['top', 'right', 'bottom'],
            180: ['right', 'bottom', 'left'],
            270: ['bottom', 'left', 'top']
        },
        'cross': {
            0: ['left', 'top', 'right', 'bottom']
        },
        'start': {
            90: ['right'],
            180: ['bottom'],
        },
        'end': {
            0: ['top'],
            270: ['left']
        }
    }

    const pipe1Connections = connections[pipe1.type]?.[pipe1.rotation] || [];
    const pipe2Connections = connections[pipe2.type]?.[pipe2.rotation] || [];

    const oppositeDirection = {
        'top': 'bottom',
        'bottom': 'top', 
        'left': 'right',
        'right': 'left'
    };

    return pipe1Connections.includes(direction) && 
           pipe2Connections.includes(oppositeDirection[direction]);
}

const findPath = (grid, rows, cols) => {
    const start = { x: 0, y: 0 };
    const end = { x: cols - 1, y: rows - 1 };
    
    const visited = Array(rows).fill().map(() => Array(cols).fill(false));
    const queue = [start];
    visited[start.y][start.x] = true;

    while (queue.length > 0) {
        const current = queue.shift();
        
        if (current.x === end.x && current.y === end.y) {
            return true;
        }

        const directions = [
            { dx: 0, dy: -1, dir: 'top' },
            { dx: 1, dy: 0, dir: 'right' },
            { dx: 0, dy: 1, dir: 'bottom' },
            { dx: -1, dy: 0, dir: 'left' }
        ];

        for (const { dx, dy, dir } of directions) {
            const nx = current.x + dx;
            const ny = current.y + dy;

            if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && !visited[ny][nx]) {
                const currentPipe = grid[current.y][current.x];
                const neighborPipe = grid[ny][nx];

                if (currentPipe && neighborPipe && canConnect(currentPipe, neighborPipe, dir)) {
                    visited[ny][nx] = true;
                    queue.push({ x: nx, y: ny });
                }
            }
        }
    }

    return false;
};

const ItemTypes = {
    PIPE: 'pipe'
};

const DraggableGridElement = memo(({ 
    y, 
    x, 
    cell, 
    isActive, 
    onRotate,
    onSwap 
}) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: ItemTypes.PIPE,
        item: { y, x, type: 'pipe' },
        canDrag: isActive,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.PIPE,
        drop: (item) => {
            if (item.y !== y || item.x !== x) {
                onSwap(item.y, item.x, y, x);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    const ref = (node) => {
        dragRef(node);
        dropRef(node);
    };

    return (
        <GridElement 
            ref={ref}
            type={cell.type}
            rotation={cell.rotation}
            isActive={isActive}
            isDragged={isDragging}
            isDropTarget={isOver}
            onClick={() => onRotate(y, x)}
        />
    );
});

export const Field = memo(({ isActive, rows, cols, onFinish }) => {
    const [gridData, setGridData] = useState(Array(rows).fill().map(() => Array(cols).fill(null)));

    useEffect(() => {
        const path = generatePath(rows, cols);        
        const newGrid = Array(rows).fill().map(() => Array(cols).fill(null));
        const randomPipeTypes = ["straight", "curved", "cross", "tee"];

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const pathPoint = path.find(point => point.x === x && point.y === y);
                if (pathPoint) {
                    pathPoint.rotation = normalizeRotation(pathPoint)
                    newGrid[y][x] = pathPoint;
                } else {
                    newGrid[y][x] = {
                        //type: randomPipeTypes[Math.floor(Math.random() * randomPipeTypes.length)],
                        type: "",
                        rotation: Math.floor(Math.random() * 4) * 90,
                        //rotation: 0,
                        x,
                        y
                    };
                }
            }
        }
        
        setGridData(newGrid);
    }, [rows, cols]);

    const normalizeRotation = (element) => {
        const divisors = {
            start: 360, 
            end: 360,
            straight: 180,
            curved: 360,
            tee: 360,
            cross: 90
        };
        const elementType = element.type
        const divisor = divisors[elementType];

        return element.rotation % divisor
    }

    const handleRotate = (y, x) => {
        if (!isActive) return;
        
        setGridData(prevGrid => {
            const newGrid = [...prevGrid];
            const newRow = [...newGrid[y]];
            const cell = newRow[x];
            
            if (cell) {
                cell.rotation = cell.rotation + 90
                newRow[x] = {
                    ...cell,
                    rotation: (normalizeRotation(cell))
                };
                newGrid[y] = newRow;
            }

            if (findPath(newGrid, rows, cols)) {
                onFinish()
            }
            
            return newGrid;
        });
    };

    const handleSwap = (y1, x1, y2, x2) => {
        if (!isActive) return;
        if (y2 == 0 && x2 == 0) return
        if (y2 == rows - 1 && x2 == cols - 1) return
        
        setGridData(prevGrid => {
            const newGrid = [...prevGrid];

            console.log('swap', { y1, x1, y2, x2 });
            console.log('element1', prevGrid[y1][x1]);
            console.log('element2', prevGrid[y2][x2]);
            
            if (y1 === y2) {
                const newRow = [...prevGrid[y1]];               
                [newRow[x1], newRow[x2]] = [newRow[x2], newRow[x1]];
                newGrid[y1] = newRow;
            } else {
                const newRow1 = [...prevGrid[y1]];
                const newRow2 = [...prevGrid[y2]];
                [newRow1[x1], newRow2[x2]] = [newRow2[x2], newRow1[x1]];
                newGrid[y1] = newRow1;
                newGrid[y2] = newRow2;
            }

            if (findPath(newGrid, rows, cols)) {
                onFinish()
            }

            return newGrid;
        });
    };

    const renderGrid = () => {
        const gridElements = [];
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = gridData[y][x];

                if (!cell) {
                    return null;
                }

                const key = `${y}-${x}`;
                
                gridElements.push(
                    <DraggableGridElement 
                        key={key}
                        y={y}
                        x={x}
                        cell={cell}
                        isActive={cell.type !== 'start' ? cell.type !== 'end' ? isActive : false : false}
                        onRotate={handleRotate}
                        onSwap={handleSwap}
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
});