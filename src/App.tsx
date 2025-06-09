// router
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
// tanstack query
import { QueryClient , QueryClientProvider } from 'react-query'
// Auth pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
// Webiste Pages
import Home  from './pages/Website/Home';
// Dashboard pages
import LayoutDashboard from './pages/Dashboard/LayoutDashboard';
import Err404 from './pages/Errors/Err404'
// protecting pages
import RequireAuth from './pages/Protecting/RequireAuth';
import RequireBack from './pages/Protecting/RequireBack';
// create project router
const router = createBrowserRouter([
  // Auth routes
  {element : <RequireBack /> , children : [
   {path : '/login' , element : <Login />},
  {path : '/register' , element : <Register/>}
  ]},
  // Website routes
  {path : '/' , element : <Home />},
  // Dashboard route
  {element : <RequireAuth  roles={['admin','product_manger']} /> , children : [
  {path : '/jewelryDashboard' , element : <LayoutDashboard /> , children : [
    // {path : '' , element : }
  ]},
]},
// unexist page
  {path : '*' , element : <Err404 />}
])

const App = () => {
  const client = new QueryClient();
  return (
    <>
    <QueryClientProvider client={client}>
    <RouterProvider router={router}>
    </RouterProvider>
    </QueryClientProvider>
    </>
  )
}
export default App;