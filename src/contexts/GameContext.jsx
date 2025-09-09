
import { createContext, useState } from "react";

export const GameContext = createContext()

export const GameProvider = ({children}) => {

    const [nickname, setNickname] = useState("")
    const [timer, setTimer] = useState(60)
    const [score, setScore] = useState()
    const [fieldRows, setFieldRows] = useState(10)
    const [fieldCols, setFieldCols] = useState(10)
    
    return (
        <GameContext.Provider value={{nickname, setNickname, timer, setTimer, score, setScore, fieldRows, 
            setFieldRows, fieldCols, setFieldCols}}>
            {children}
        </GameContext.Provider>
    )

}