// router
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
// tanstack query
import { QueryClient , QueryClientProvider } from 'react-query'
// Auth pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
// Dashboard Pages
import LayoutDashboard from './pages/Dashboard/LayoutDashboard';
import HomeDashboard from './pages/Dashboard/HomeDashboard';
// Users Pages
import Users from './pages/Dashboard/Users/Users';
import AddUser from './pages/Dashboard/Users/AddUser'
import ModifyUser from './pages/Dashboard/Users/ModifyUser';
// Categories Pages
import Categories from './pages/Dashboard/Categories/Categories';
import AddCategory from './pages/Dashboard/Categories/AddCategory';
import ModifyCategory from './pages/Dashboard/Categories/ModifyCategory';
// Products Pages
import Products from './pages/Dashboard/Products/Products';
import AddProduct from './pages/Dashboard/Products/AddProduct';   
import ModifyProduct from './pages/Dashboard/Products/ModifyProduct';
// Errors Pages
import Err404 from './pages/Errors/Err404'
// protecting pages
import RequireAuth from './pages/Protecting/RequireAuth';
import RequireBack from './pages/Protecting/RequireBack';
// Notification Page
import Notifications from './pages/Dashboard/Notifications';

// global toast
import { Toaster } from 'react-hot-toast';
import Profile from './pages/Dashboard/Profile';
import Orders from './pages/Dashboard/Order/Order';
import OrderDetails from './pages/Dashboard/Order/OrderDetails';

const router = createBrowserRouter([
  // Auth routes
  {element : <RequireBack /> , children : [
   {path : '/login' , element : <Login />},
  {path : '/register' , element : <Register/>}
  ]},
  // Website routes
  // {path : '/' , element : <Home />},
  // Dashboard route (admin & product_manger)
  {element : <RequireAuth roles={['admin','product_manager']} /> , children : [
  {path : '/' , element : <LayoutDashboard /> , children : [
    // users pages (just for admin)
    {element : <RequireAuth roles={['admin']} /> , children : [
    {path : '' , element : <HomeDashboard />},
    {path : '/home' , element : <HomeDashboard />},
    {path : '/users' , element : <Users /> },
    {path : '/user/add' , element : <AddUser /> },
    {path : '/users/:userId' , element : <ModifyUser /> },
    {path : '/orders' , element : <Orders /> },
    {path : '/orders/:orderId' , element : <OrderDetails /> },
    ]},
    // categories pages
    {path : '/categories' , element : <Categories />   },
    {path : '/category/add' , element : <AddCategory /> },
    {path : '/categories/:categoryId' , element : <ModifyCategory /> },
    // products pages
    {path : '/products' , element : <Products /> },
    {path : '/product/add' , element : <AddProduct /> },
    {path : '/products/:productId' , element : <ModifyProduct /> },
    // notifications page
    {path : '/notifications' , element : <Notifications />},
    // profile
     {path : '/profile' , element : <Profile />},
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