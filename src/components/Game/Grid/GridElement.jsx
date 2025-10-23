import './styles.css'
import { forwardRef } from 'react'

export const GridElement = forwardRef(({ 
    type, 
    rotation, 
    isActive, 
    isDragged, 
    isDropTarget, 
    onClick 
}, ref) => {
    const getPipeImage = () => {
        switch (type) {
            case 'start':
                return "src/assets/edge-pipe.png"
            case 'end':
                return "src/assets/edge-pipe.png"
            case 'straight':
                return "src/assets/straight-pipe.png"
            case 'curved':
                return "src/assets/curved-pipe.png"
            case 'cross':
                return "src/assets/cross-pipe.png"
            case 'tee':
                return "src/assets/tee-pipe.png"
            default:
                return "empty"
        }
    }

    return (
        <div 
            ref={ref}
            className={`
                grid-element 
                ${isDragged ? 'dragged' : ''} 
                ${isDropTarget 
                    ? (type === 'start' || type === 'end' 
                        ? 'drop-target not-allowed' 
                        : 'drop-target'
                        ) 
                    : ''}
                ${!isActive ? 'disabled' : ''}
            `} 
            onClick={onClick}
        >
            <img 
                src={getPipeImage()} 
                alt={type}
                style={{ 
                    transform: `rotate(${rotation}deg)`,
                }}
            />
        </div>
    )
})