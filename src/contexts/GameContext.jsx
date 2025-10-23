
import { createContext, useState, useEffect } from "react";

export const GameContext = createContext()

export const GameProvider = ({children}) => {
    const [nickname, setNickname] = useState(
        () => localStorage.getItem('nickname') || ''
    )
    const [timer, setTimer] = useState(
        () => parseInt(localStorage.getItem('timer')) || 60
    )
    const [score, setScore] = useState(
        () => parseInt(localStorage.getItem('score')) || 0
    )
    const [fieldRows, setFieldRows] = useState(
        () => parseInt(localStorage.getItem('fieldRows')) || 10
    )
    const [fieldCols, setFieldCols] = useState(
        () => parseInt(localStorage.getItem('fieldCols')) || 10
    )
    
    useEffect(() => {
        localStorage.setItem('nickname', nickname)
    }, [nickname])
    
    useEffect(() => {
        localStorage.setItem('timer', timer)
    }, [timer])
    
    useEffect(() => {
        localStorage.setItem('score', score)
    }, [score])
    
    useEffect(() => {
        localStorage.setItem('fieldRows', fieldRows)
    }, [fieldRows])
    
    useEffect(() => {
        localStorage.setItem('fieldCols', fieldCols)
    }, [fieldCols])
    
    return (
        <GameContext.Provider value={{
            nickname, setNickname, 
            timer, setTimer, 
            score, setScore, 
            fieldRows, setFieldRows, 
            fieldCols, setFieldCols
        }}>
            {children}
        </GameContext.Provider>
    )
}

// import { createContext, useState } from "react";

// export const GameContext = createContext()

// export const GameProvider = ({children}) => {

//     const [nickname, setNickname] = useState()
//     const [timer, setTimer] = useState(60)
//     const [score, setScore] = useState()
//     const [fieldRows, setFieldRows] = useState(10)
//     const [fieldCols, setFieldCols] = useState(10)
    
//     return (
//         <GameContext.Provider value={{nickname, setNickname, timer, setTimer, score, setScore, fieldRows, 
//             setFieldRows, fieldCols, setFieldCols}}>
//             {children}
//         </GameContext.Provider>
//     )

// }