import { createBrowserRouter , RouterProvider } from 'react-router-dom'
// Auth pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
// Webiste Pages
import Home  from './pages/Website/Home';
// Dashboard pages
const router = createBrowserRouter([
  // Auth routes
  {path : '/login' , element : <Login />},
  {path : '/register' , element : <Register/>},
  // Website routes
  {path : '/' , element : <Home />},
  // Dashboard route
])

const App = () => {
  return (
    <>
    <RouterProvider router={router}>
    </RouterProvider>
    </>
  )
}
export default App;