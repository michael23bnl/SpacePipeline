

import './styles.css'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { GameContext } from '../../../contexts/GameContext'


export const Form = () => {

    const {nickname, setNickname, timer, setTimer} = useContext(GameContext)

    const [nicknameError, setNicknameError] = useState("")

    const [timerError, setTimerError] = useState("")

    const navigate = useNavigate()

    const handleSetNickname = (e) => {
        const value = e.target.value
        setNickname(e.target.value)
        if (value === "") {
            setNicknameError("Заполните это поле!")
        }
        else {
            setNicknameError("")
        }
    }

    const handleSetTimer = (e) => {
        
        const value = e.target.value

        if (value === "") {
            setTimerError("Заполните это поле!")
            setTimer("")
        }

        else {
            const numberValue = Number(value)

            if (isNaN(numberValue)) {
                setTimerError("Введите число!")
            }
            else if (numberValue <= 0) {
                setTimerError("Время должно быть больше 0!")
            }
            else {
                setTimerError("")
                setTimer(numberValue)
            }
        }
    }

    const handleStartGame = (e) => {
        e.preventDefault()     
        navigate("/game")      
    }

    return (     
        <form className="start-screen-form">

            <label>
                Ваше имя
            </label>
            <input 
                type="text"
                value={nickname}
                placeholder="Например, Иван"
                onChange={handleSetNickname}
            />
            
            {nicknameError && <div>{nicknameError}</div>}

            <label>
                Длительность игры (в секундах)
            </label>
            <input 
                type="text" 
                value={timer}
                onChange={handleSetTimer}
            />

            {timerError && <div>{timerError}</div>}

            <button
                disabled={timer === "" || nickname === ""}
                onClick={handleStartGame}
            >
                Начать игру
            </button>
        </form>      
    )
}