import './styles.css'
import { Field } from "./Field/Field"
import { useContext, useEffect, useState, useRef } from 'react'
import { GameContext } from '../../contexts/GameContext'
import { useNavigate } from 'react-router-dom'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const Game = () => {
    const { setScore } = useContext(GameContext)
    const { nickname, timer, fieldRows, fieldCols } = useContext(GameContext)
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
        
        setTimeout(() => {
            navigate('/results')
        }, 500)
    }

    const onPause = () => {
        setIsPaused(prev => !prev)
    }

    return(
        <div className='game-screen'>
            <div className='session-data'>
                <div className="nickname-area">{nickname}</div>
                <div className="timer-area">
                    {formatTime(timeLeft)}
                </div>
                <button
                    className={`pause-button ${isPaused ? 'paused' : ''}`}
                    onClick={onPause}
                >
                    {isPaused ? '▶ Продолжить' : '⏸ Пауза'}
                </button>
            </div>
            <div className="game-field-container">        
                <DndProvider backend={HTML5Backend}>
                    <Field isActive={!isPaused} rows={fieldRows} cols={fieldCols} onFinish={onFinish}/>
                </DndProvider>
            </div>
        </div>
    )
}