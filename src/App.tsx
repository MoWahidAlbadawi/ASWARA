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
// protecting pages
import RequireAuth from './pages/Protecting/RequireAuth';
import RequireBack from './pages/Protecting/RequireBack';// create project router
const router = createBrowserRouter([
  // Auth routes
  {element : <RequireBack /> , children : [
   {path : '/login' , element : <Login />},
  {path : '/register' , element : <Register/>}
  ]},
  // Website routes
  {path : '/' , element : <Home />},
  // Dashboard route (admin & product_manger)
  {element : <RequireAuth roles={['admin','product_manger']} /> , children : [
  {path : '/aswaraDashboard' , element : <LayoutDashboard /> , children : [
    // users pages (just for admin)
    {element : <RequireAuth roles={['admin']} /> , children : [
    {path : '/aswaraDashboard/users' , element : <Users /> },
    {path : '/aswaraDashboard/user/add' , element : <AddUser /> },
    {path : '/aswaraDashboard/users/:id' , element : <EditUser /> },
    ]},
    // categories pages
    {path : '/aswaraDashboard/categories' , element : <Categories />   },
    {path : '/aswaraDashboard/category/add' , element : <AddCategory /> },
    {path : '/aswaraDashboard/categories/:id' , element : <EditCategory /> },
    // products pages
    {path : '/aswaraDashboard/products' , element : <Products /> },
    {path : '/aswaraDashboard/product/add' , element : <AddProduct /> },
    {path : '/aswaraDashboard/products/:id' , element : <EditProduct /> },
    // notifications page
    {path : '/aswaraDashboard/notifications' , element : <Notifications />}
  ]},
]},
  // unexist page
  {path : '*' , element : <Err404 />}
]);

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