import './styles.css'
import { useState, useEffect } from 'react'

export const GridElement = ({ type, initialRotation, isActive }) => {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    setRotation(initialRotation)
  }, [initialRotation])

  const handleRotate = () => {
    if (!isActive) return
    setRotation(prev => (prev + 90) % 360)
  }

  const getPipeImage = () => {
    switch (type) {
      case 'start':
        //return "src/assets/pipe-end.png"
      case 'end':
        return "src/assets/pipe-end.png"
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
    <div className='grid-element' onClick={handleRotate}>
      <img 
        src={getPipeImage()} 
        alt={type}
        style={{ 
          transform: `rotate(${rotation}deg)`,
        }}
      />
    </div>
  )
}