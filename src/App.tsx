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
import AddUser from './pages/Dashboard/Users/AddUser'
import ModifyUser from './pages/Dashboard/Users/ModifyUser';
import Products from './pages/Dashboard/Products/Products';
import AddProduct from './pages/Dashboard/Products/AddProduct';   
import ModifyProduct from './pages/Dashboard/Products/ModifyProduct';
import Categories from './pages/Dashboard/Categories/Categories';
import AddCategory from './pages/Dashboard/Categories/AddCategory';
import ModifyCategory from './pages/Dashboard/Categories/ModifyCategory';
import Notifications from './pages/Dashboard/Notifications';
// protecting pages
import RequireAuth from './pages/Protecting/RequireAuth';
import RequireBack from './pages/Protecting/RequireBack';// create project router
import HomeDashboard from './pages/Dashboard/HomeDashboard';
// global toast
import { Toaster } from 'react-hot-toast';
import Profile from './pages/Dashboard/Profile';
const router = createBrowserRouter([
  // Auth routes
  {element : <RequireBack /> , children : [
   {path : '/login' , element : <Login />},
  {path : '/register' , element : <Register/>}
  ]},
  // Website routes
  {path : '/' , element : <Home />},
  // Dashboard route (admin & product_manger)
  {element : <RequireAuth roles={['admin','product_manager']} /> , children : [
  {path : '/aswaraDashboard' , element : <LayoutDashboard /> , children : [
    // users pages (just for admin)
    {element : <RequireAuth roles={['admin']} /> , children : [
    {path : '' , element : <HomeDashboard />},
    {path : '/aswaraDashboard/home' , element : <HomeDashboard />},
    {path : '/aswaraDashboard/users' , element : <Users /> },
    {path : '/aswaraDashboard/user/add' , element : <AddUser /> },
    {path : '/aswaraDashboard/users/:userId' , element : <ModifyUser /> },
    ]},
    // categories pages
    {path : '/aswaraDashboard/categories' , element : <Categories />   },
    {path : '/aswaraDashboard/category/add' , element : <AddCategory /> },
    {path : '/aswaraDashboard/categories/:categoryId' , element : <ModifyCategory /> },
    // products pages
    {path : '/aswaraDashboard/products' , element : <Products /> },
    {path : '/aswaraDashboard/product/add' , element : <AddProduct /> },
    {path : '/aswaraDashboard/products/:productId' , element : <ModifyProduct /> },
    // notifications page
    {path : '/aswaraDashboard/notifications' , element : <Notifications />},
    // profile
     {path : '/aswaraDashboard/profile' , element : <Profile />},
  ]},
]},
  // unexist page
  {path : '*' , element : <Err404 />}
]);

const App = () => {
  const client = new QueryClient();
  return (
    <>
  {/* toast */}
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#1e293b',
          color: '#fff',
          fontSize: '15px',
          fontWeight: 500,
          borderRadius: '8px',
          padding: '12px 16px',
          minHeight: '52px',
        },
        success: {
          style: {
            background: '#16a34a', 
            color: '#fff',
          },
         icon: '✅',
        },
        error: {
          style: {
            background: '#dc2626',
            color: '#fff',
          },
          icon: '❌',
        },
      }}
    />
    <QueryClientProvider client={client}>
    <RouterProvider router={router}>
    </RouterProvider>
    </QueryClientProvider>
    </>
  )
}
export default App;