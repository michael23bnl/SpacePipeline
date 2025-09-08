
import './styles.css'
import { useState } from 'react'

export const GridElement = ({ index, isActive }) => {
    const [rotation, setRotation] = useState(0)

    const handleRotate = () => {
        if (!isActive) {
            return
        }
        setRotation(prev => prev + 90)
    }

    return (
        <div 
            className='grid-element' 
            onClick={handleRotate}
        >
            {index % 2 === 0 ? (
                <img 
                    src="src/assets/straight-pipe.svg" 
                    style={{ 
                        transform: `rotate(${rotation}deg)`,
                    }}
                />
            ) : (
                <img 
                    src="src/assets/curved-pipe1.svg" 
                    style={{ 
                        transform: `rotate(${rotation}deg)`,
                    }}
                />
            )}
        </div>
    )

}