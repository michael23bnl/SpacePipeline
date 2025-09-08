import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Layout } from './app/layout.jsx'
import { NotFound } from './app/not-found.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Game } from './components/Game/Game.jsx'
import { Home } from './components/Home/Home.jsx'
import { Results } from './components/Results/Results.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, // сработает при переходе на "/"
        element: <Home />
      },
      {
        path: "/game",
        element: <Game />
      },
      {
        path: "/results",
        element: <Results />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
