
import './styles.css'
import { useNavigate } from "react-router-dom"
import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'

export const Results = () => {

    const navigate = useNavigate()

    const { score, fieldRows, fieldCols } = useContext(GameContext)

    const onRestart = () => {
        navigate('/game')
    }

    const onMenu = () => {
        navigate('/')
    }

    return(
        <div className='results-form-area'>
            <div className="score-area">
                    {Number(score) ? (
                        <>
                            <div className="field-size">Поле {fieldRows}x{fieldCols}</div>
                            <div className="score">Ваш результат: {score} с</div>
                        </>
                    ) : (
                        "Время вышло!"
                    )}
            </div>

            <div className="navigate-buttons">
                <button className="replay-button" onClick={onRestart}>Играть заново</button>
                <button className="main-menu-button" onClick={onMenu}>В главное меню</button>
            </div>
        </div>
    )
}