import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import UserContext from './Context/UserContext.tsx'
import BookContext from './Context/BookContext.tsx'
import CartContext from './Context/CartContext.tsx'
import OrderContext from './Context/OrderContext.tsx'
import ReviewContext from './Context/ReviewContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContext>
      <BookContext>
        <CartContext>
          <OrderContext>
            <ReviewContext>
      <App />
      </ReviewContext>
      </OrderContext>
      </CartContext>
      </BookContext>
    </UserContext>
  </StrictMode>
)
