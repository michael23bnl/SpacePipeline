import './styles.css'
import { useState } from 'react'

export const GridElement = ({ x, y, type, initialRotation = 0, isActive }) => {
  const [rotation, setRotation] = useState(initialRotation)

  const handleRotate = () => {
    if (!isActive) return
    setRotation(prev => (prev + 90) % 360)
  }

  const getPipeImage = () => {
    switch (type) {
      case 'straight':
        return "src/assets/straight-pipe.svg"
      case 'curved':
        return "src/assets/curved-pipe1.svg"
      default:
        return "src/assets/straight-pipe.svg"
    }
  }

  return (
    <div 
      className='grid-element' 
      onClick={handleRotate}
      data-x={x}
      data-y={y}
    >
      <img 
        src={getPipeImage()} 
        alt={type}
        style={{ 
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.3s ease'
        }}
      />
    </div>
  )
}



// import './styles.css'
// import { useState } from 'react'

// export const GridElement = ({ index, isActive }) => {
//     const [rotation, setRotation] = useState(0)

//     const handleRotate = () => {
//         if (!isActive) {
//             return
//         }
//         setRotation(prev => prev + 90)
//     }

//     return (
//         <div 
//             className='grid-element' 
//             onClick={handleRotate}
//         >
//             {index % 2 === 0 ? (
//                 <img 
//                     src="src/assets/straight-pipe.svg" 
//                     style={{ 
//                         transform: `rotate(${rotation}deg)`,
//                     }}
//                 />
//             ) : (
//                 <img 
//                     src="src/assets/curved-pipe1.svg" 
//                     style={{ 
//                         transform: `rotate(${rotation}deg)`,
//                     }}
//                 />
//             )}
//         </div>
//     )

// }