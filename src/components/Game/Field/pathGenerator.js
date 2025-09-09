
export const generatePath = (rows = 8, cols = 8) => {
  const path = [];
  const endX = cols - 1, endY = rows - 1;
  
  let x = 0, y = 0;

  path.push({ x, y, type: 'start', rotation: 0 });
 
  while (x !== endX || y !== endY) {
    const canGoRight = x < endX;
    const canGoDown = y < endY;
    
    let move;
    if (canGoRight && canGoDown) {
      move = Math.random() > 0.5 ? 'right' : 'down';
    } else if (canGoRight) {
      move = 'right';
    } else {
      move = 'down';
    }
    
    if (move === 'right') {
      x++;
    } else {
      y++;
    }

    if (x > 0 && y > 0) {
        if (path[path.length - 2].x !== x && path[path.length - 2].y !== y) {
            path[path.length - 1].type = 'curved'
        }
    }

    let type = 'straight'

    if (x == endX && y == endY) {
        type = 'end'
    }

    path.push({ 
      x, y, type,
      rotation: 0
    });
  }
  
  return path;
}