
import { Outlet } from "react-router-dom";
import { GameProvider } from "../contexts/GameContext";

export const Layout = () => {

    return (
         <GameProvider>

            <header></header>

            <main>
                <Outlet />
            </main>
            
            <footer></footer>
            
         </GameProvider>
    );
}