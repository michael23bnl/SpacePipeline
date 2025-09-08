
import { createContext, useState } from "react";

export const GameContext = createContext()

export const GameProvider = ({children}) => {

    const [nickname, setNickname] = useState("")
    const [timer, setTimer] = useState(60)
    const [score, setScore] = useState()
    
    return (
        <GameContext.Provider value={{nickname, setNickname, timer, setTimer, score, setScore}}>
            {children}
        </GameContext.Provider>
    )

}