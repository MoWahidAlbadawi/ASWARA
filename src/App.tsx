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
import Users from './pages/Dashboard/Users/Users';
import AddUser from './pages/Dashboard/Users/AddUser';
import EditUser from './pages/Dashboard/Users/EditUser';
import Products from './pages/Dashboard/Products/Products';
import AddProduct from './pages/Dashboard/Products/AddProduct';
import EditProduct from './pages/Dashboard/Products/EditProduct';
import Categories from './pages/Dashboard/Categories/Categories';
import AddCategory from './pages/Dashboard/Categories/AddCategory';
import EditCategory from './pages/Dashboard/Categories/EditCategory';
import Notifications from './pages/Dashboard/Notifications';
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
      // users pages
    {path : '/jewelryDashboard/users' , element : <Users />},
    {path : '/jewelryDashboard/user/add' , element : <AddUser />},
    {path : '/jewelryDashboard/users/:id' , element : <EditUser />},
    // products pages
    {path : '/jewelryDashboard/products' , element : <Products />},
    {path : '/jewelryDashboard/product/add' , element : <AddProduct />},
    {path : '/jewelryDashboard/products/:id' , element : <EditProduct />},
    // categories pages
    {path : '/jewelryDashboard/categories' , element : <Categories />},
    {path : '/jewelryDashboard/category/add' , element : <AddCategory />},
    {path : '/jewelryDashboard/categories/:id' , element : <EditCategory />},
    // notification
    {path : '/jewelryDashboard/notifications' , element : <Notifications />}
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