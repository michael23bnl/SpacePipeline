
// export const generatePath = (rows, cols) => {
//   const path = [];
//   const visited = Array(rows).fill().map(() => Array(cols).fill(false)); 
//   const endX = cols - 1, endY = rows - 1;
  
//   let x = 0, y = 0;
//   visited[y][x] = true; 
//   path.push({ x, y, type: 'start', rotation: 0 });
  
//   while (x !== endX || y !== endY) {
//     const possibleMoves = [];
    
//     if (x < endX && !visited[y][x + 1]) possibleMoves.push('right');
//     if (y < endY && !visited[y + 1][x]) possibleMoves.push('down');
//     if (x > 0 && !visited[y][x - 1]) possibleMoves.push('left');
//     if (y > 0 && !visited[y - 1][x]) possibleMoves.push('up');
    
//     if (possibleMoves.length === 0) {
//       if (path.length <= 1) {
//         console.log('restarting')
//         return generatePath(rows, cols);
//       }
      
//       visited[y][x] = true;
//       path.pop();
      
//       const prevPoint = path[path.length - 1];
//       x = prevPoint.x;
//       y = prevPoint.y;
//       prevPoint.type = 'straight'
//       continue;
//     }
   
//     const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    
//     switch (move) {
//       case 'right': x++; break;
//       case 'down': y++; break;
//       case 'left': x--; break;
//       case 'up': y--; break;
//     }
    
//     visited[y][x] = true
    
//     if (path.length > 1) {
//       if (path[path.length - 2].x !== x && path[path.length - 2].y !== y) {
//           path[path.length - 1].type = 'curved'
//       }
//     }
   
//     path.push({ 
//       x, y, 
//       type: (x === endX && y === endY) ? 'end' : 'straight',
//       rotation: 0
//     });
//   }

//   if (path[1].x > 0) {
//     path[0].rotation = 90
//   }
//   else {
//     path[0].rotation = 180
//   }

//   if (path[path.length - 1].x - path[path.length - 2].x > 0) {
//     path[path.length - 1].rotation = 270
//   }

//   generateSidePaths(path, visited)
  
//   return path
// }



export const generatePath = (rows, cols) => {

  const { path, visited } = generateMainPath(rows, cols)
  const sidePath = generateSidePaths(path, visited, rows, cols)
  const finalPath = [...path, ...sidePath]

  normalizeRotation(finalPath)

  return finalPath
}

const generateMainPath = (rows, cols) => {
  const path = [];
  const visited = Array(rows).fill().map(() => Array(cols).fill(false)); 
  const endX = cols - 1, endY = rows - 1;
  
  let x = 0, y = 0;

  visited[y][x] = true; 
  path.push({ x, y, type: 'start', rotation: 0 });
  
  while (x !== endX || y !== endY) {
    const possibleMoves = [];
    
    if (x < endX) possibleMoves.push('right');
    if (y < endY) possibleMoves.push('down');
   
    const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    
    switch (move) {
      case 'right': x++; break;
      case 'down': y++; break;
    }
    
    visited[y][x] = true
    
    if (path.length > 1) {
      if (path[path.length - 2].x !== x && path[path.length - 2].y !== y) {
          path[path.length - 1].type = 'curved'
      }
    }
   
    path.push({ 
      x, y, 
      type: (x === endX && y === endY) ? 'end' : 'straight',
      rotation: Math.floor(Math.random() * 4) * 90
    });
  }

  if (path[1].x > 0) { // разворачиваем начальную и конечную трубы в направлении начала и конца пути соответственно
    path[0].rotation = 90
  }
  else {
    path[0].rotation = 180
  }

  if (path[path.length - 1].x - path[path.length - 2].x > 0) {
    path[path.length - 1].rotation = 270
  }
  else {
    path[path.length - 1].rotation = 0
  }
  
  return { path, visited }
}

const generateSidePaths = (path, visited, rows, cols) => {

  let sidePath = [];
  let finalSidePaths = []

  const endX = cols - 1, endY = rows - 1;
  const randomFragmentIndex = Math.floor(Math.random() * (path.length - 2)) + 1;
  const fragment = path[randomFragmentIndex];
  let x = fragment.x, y = fragment.y;
  const connections = countPossibleConnections(x, y, endX, endY, visited)

  if (connections > 0) {
    path.splice(randomFragmentIndex, 1);

    switch (connections) {
      case 1: fragment.type = 'tee'
      break
      case 2: fragment.type = 'cross'
      break
    }
  }
  
  for (let i = 0; i < connections; i++) {
    sidePath.push(fragment)

    while (x !== endX || y !== endY) {
      const possibleMoves = [];     
      if (x < endX && !visited[y][x + 1]) possibleMoves.push('right');
      if (y < endY && !visited[y + 1][x]) possibleMoves.push('down');
      if (x > 0 && !visited[y][x - 1]) possibleMoves.push('left');
      if (y > 0 && !visited[y - 1][x]) possibleMoves.push('up');
      
      if (possibleMoves.length === 0) {
        //console.log(x, y, "dead end")
        if (sidePath.length === 1) {
          //fragment.type = 'tee' нужно менять в том случае, если количество подключенных к фрагменту труб равно 3
        }
        else {
          finalSidePaths = [...finalSidePaths, ...sidePath]
          sidePath = []
          handleDeadEnd(x, y, endX, endY, finalSidePaths, path)
        }
        break;
      }
    
      const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      
      switch (move) {
        case 'right': x++; break;
        case 'down': y++; break;
        case 'left': x--; break;
        case 'up': y--; break;
      }
      
      visited[y][x] = true;
      
      if (sidePath.length > 1) {
        if (sidePath[sidePath.length - 2].x !== x && sidePath[sidePath.length - 2].y !== y) {
            sidePath[sidePath.length - 1].type = 'curved'
        }
      }
    
      sidePath.push({ 
        x, y, 
        type: 'straight',
        rotation: Math.floor(Math.random() * 4) * 90
      });
    }

    x = fragment.x
    y = fragment.y;
  }
  
  return finalSidePaths;
}

const countPossibleConnections = (x, y, endX, endY, visited) => {
  let count = 0;

  if (x < endX && !visited[y][x + 1]) count++
  if (y < endY && !visited[y + 1][x]) count++
  if (x > 0 && !visited[y][x - 1]) count++
  if (y > 0 && !visited[y - 1][x]) count++

  return count
}

const handleDeadEnd = (x, y, endX, endY, sidePath, path) => {

  const sidePathLength = sidePath.length

  //console.log(sidePath, "sidePath")
  //console.log(path, "mainPath")
  const prevX = sidePath[sidePathLength - 2].x
  const prevY = sidePath[sidePathLength - 2].y
  const possibleMoves = []

  if (x < endX && prevX - x !== 1) { // не дошли ли мы до края и не пришли ли мы из точки, в которую хотим переместиться
    if (!(x + 1 === endX && y === endY)) { // не попадаем ли мы в конечную точку маршрута
      possibleMoves.push('right')
    }
  } 
  if (y < endY && prevY - y !== 1) {
    if (!(x === endX && y + 1 === endY)) {
      possibleMoves.push('down')
    }
  }
  if (x > 0 && x - prevX !== 1) {
    if (!(x - 1 === 0 && y === 0)) {
      possibleMoves.push('left')
    }
  }
  if (y > 0 && y - prevY !== 1) {
    if (!(x === 0 && y - 1 === 0)) {
      possibleMoves.push('up')
    }
  } 

  const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

  switch (move) {
    case 'right': x++; break;
    case 'down': y++; break;
    case 'left': x--; break;
    case 'up': y--; break;
  }

  if (prevX !== x && prevY !== y) {
    sidePath[sidePathLength - 1].type = 'curved'
  }

  const loopClosingFragment = sidePath.find(fragment => fragment.x === x && fragment.y === y) ||
  path.find(fragment => fragment.x === x && fragment.y === y);

  const loopClosingFragmentType = loopClosingFragment.type

  switch (loopClosingFragmentType) {
    case 'straight':
      loopClosingFragment.type = 'tee'
      break;
    case 'curved':
      loopClosingFragment.type = 'tee'
      break;
    case 'tee':
      loopClosingFragment.type = 'cross'
      break;
  }
}

const normalizeRotation = (path) => {

  const divisors = {
      start: 360, 
      end: 360,
      straight: 180,
      curved: 360,
      tee: 360,
      cross: 90
  };

  path.forEach(element => {
    const elementType = element.type
    const divisor = divisors[elementType];
    element.rotation = element.rotation % divisor
  });
}