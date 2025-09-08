import './styles.css'
import { GridElement } from '../Grid/GridElement'

export const Field = ({ isActive }) => {

    const grid = []

    grid.push(
        <div className='grid-element'>
            <img src="src/assets/pipe-end.svg"></img>
        </div>
    )

    for (let i = 1; i < 99; i++) {
        grid.push(<GridElement key={i} index={i} isActive={isActive} />);
        // grid.push(
        //     <div className='grid-element'>
        //         {i % 2 === 0 ? (
        //             <img src="src/assets/straight-pipe.svg"></img>
        //         )
        //         : (
        //             <img src="src/assets/curved-pipe1.svg"></img>
        //         )}
        //     </div>
        // )
    }

    grid.push(
        <div className='grid-element'>
            <img src="src/assets/pipe-end.svg"></img>
        </div>
    )

    return (
        <div className='game-field'>{grid}</div>
    );
}