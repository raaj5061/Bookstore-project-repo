import React from 'react'
import { createBrowserRouter,RouterProvider} from "react-router"
import RouteError from './components/RouteError'
import LandingPage from './components/LandingPage'
import RootLayout from './components/RootLayout'
import Admin from './components/Admin'
import UserManagement from './components/UserManagement'
import InventoryManagement from './components/InventoryManagement'
import OrderManagement from './components/OrderManagement'
import Review from './components/Review'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import Orders from './components/Orders'
import UserLogin from './components/UserLogin'
import UserRegistration from './components/UserRegistration'
import BookManagement from './components/BookManagement'
import './App.css'
import Dashboard from './components/Dashboard'
import Checkout from './components/Checkout'
import CardList from './components/CardList'
import UserDashboard from './components/UserDashboard'

function App() {
  let browserRouterObj=createBrowserRouter([{
    path:'/',
    element:<RootLayout/>,
    errorElement:<RouteError/>,
    children:[
      {
        index:true,
        path:'',
        element:<LandingPage/>
      },{
        path:'user-profile',
        element:<UserDashboard/>
      },{
        path:'checkout',
        element:<Checkout/>
      },{
        path:'orders',
        element:<Orders/>
      },
      {
        path:'login',
        element:<UserLogin/>
      },{
        path:'cart',
        element:<Cart />
      },
      {
        path:'registration',
        element:<UserRegistration/>
      },{
          path:'user-management',
          element:<UserManagement/>
      },{
        path:'card-list',
        element:<CardList/>
      },
      {
          path:'*',
          element:<NotFound/>
      },{
        path:'admin',
        element:<Admin/>,
        children:[{
          index:true,
          path:'',
          element:<Dashboard/>
        },{
          path:'inventory-management',
          element:<InventoryManagement/>
        },{
          path:'order-management',
          element:<OrderManagement/>
        },{
          path:'book-management',
          element:<BookManagement/>
        },
        {
          path:'reviews',
          element:<Review/>
        }
        ]
      }
    ]
  }])
  return (
    <div>

      <RouterProvider router={browserRouterObj} />
      
    </div>
  )
}

export default App