import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import PAGE from './constants/page'
import PATH from './constants/path'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: PATH.MainList,
                element: <PAGE.MainList />,
                errorElement: <PAGE.NotFound />
            }
        ],
        errorElement: <PAGE.NotFound />
    }
])

export default router;