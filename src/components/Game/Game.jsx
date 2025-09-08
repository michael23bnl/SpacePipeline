import './styles.css'
import { Field } from "./Field/Field"
import { useContext, useEffect, useState, useRef } from 'react'
import { GameContext } from '../../contexts/GameContext'
import { useNavigate } from 'react-router-dom'

export const Game = () => {
    const { setScore } = useContext(GameContext)
    const { nickname, timer } = useContext(GameContext)
    const [timeLeft, setTimeLeft] = useState(timer)
    const [isPaused, setIsPaused] = useState(false)
    const intervalRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeIsUp()
            return
        }

        if (!isPaused) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    const newTime = prev - 1
                    if (newTime <= 0) {
                        clearInterval(intervalRef.current)
                        onTimeIsUp()
                        return 0
                    }
                    return newTime
                })
            }, 1000)
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isPaused])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const onTimeIsUp = () => {
        setScore("Время вышло!")
        navigate('/results')
    }

    const onFinish = () => {
        setScore(timer - timeLeft)
        navigate('/results')
    }

    const onPause = () => {
        setIsPaused(prev => !prev)
    }

    return(
        <>
            <div className='session-data'>
                <div className="nickname-area">{nickname}</div>
                <div className="timer-area">
                    Осталось времени: {formatTime(timeLeft)}
                </div>
            </div>
            <Field isActive={!isPaused}/>
            <button
                className={`pause-button ${isPaused ? 'paused' : ''}`}
                onClick={onPause}
            >
                {isPaused ? 'Продолжить' : 'Пауза'}
            </button>
        </>
    )
}