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
            },
            {
                path: PATH.Login,
                element: <PAGE.Login />,
                errorElement: <PAGE.NotFound />
            },
            {
                path: PATH.GoogleCallBack,
                element: <PAGE.GoogleLoginCallback />,
                errorElement: <PAGE.NotFound />
            },
            {
                path: PATH.KakaoCallBack,
                element: <PAGE.KakaoLoginCallback />,
                errorElement: <PAGE.NotFound />
            }
        ],
        errorElement: <PAGE.NotFound />
    }
])

export default router;