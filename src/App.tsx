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
// create project router
const router = createBrowserRouter([
  // Auth routes
  {path : '/login' , element : <Login />},
  {path : '/register' , element : <Register/>},
  // Website routes
  {path : '/' , element : <Home />},
  // Dashboard route
  {path : '/jewelryDashboard' , element : <LayoutDashboard /> , children : [
    // {path : '' , element : }
  ]}
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