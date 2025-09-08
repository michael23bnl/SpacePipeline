
import './styles.css'
import { useNavigate } from "react-router-dom"
import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'

export const Results = () => {

    const navigate = useNavigate()

    const { score } = useContext(GameContext)

    const onRestart = () => {
        navigate('/game')
    }

    const onMenu = () => {
        navigate('/')
    }


    return(
        <>
            <div className="score">{Number(score) ? `Ваш результат: ${score}` : "Время вышло!"}</div>

            <div className="navigate-buttons">
                <button onClick={onRestart}>Играть заново</button>
                <button onClick={onMenu}>В главное меню</button>
            </div>
        </>
    )
}