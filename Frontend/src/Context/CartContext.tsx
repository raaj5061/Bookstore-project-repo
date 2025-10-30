import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { BookType } from "../components/Card";
import { userContextObj } from "./UserContext";


export type CartItem = BookType & {
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (book: BookType) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void; 
};

export const cartContextObj = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  // ADDED
  clearCart: () => {}, 
});

type contextProps = {
  children: ReactNode;
};

function CartContext({ children }: contextProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { currentUser } = useContext(userContextObj);

  // Load cart when user logs in
  useEffect(() => {
    if (currentUser?.id) {
      getCartFromBackend();
    }
  }, [currentUser]);

  // Sync cart when closed or when cart changes (if not open)
  // FIX: Removed addToCart from dependencies
  useEffect(() => {
    // Only save if the user is logged in AND the cart is not open (to prevent rapid saving while shopping)
    if (!isCartOpen && currentUser?.id) {
      saveCartToBackend();
    }
  }, [cart, isCartOpen, currentUser?.id]);

  function addToCart(newBook: BookType) {
    setCart((currentCart) => {
      const itemIndex = currentCart.findIndex((item) => item.id === newBook.id);
      if (itemIndex > -1) {
        return currentCart.map((item, index) =>
          index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...currentCart, { ...newBook, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  }

  function removeFromCart(bookId: string) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== bookId));
  }

  function increaseQuantity(bookId: string) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === bookId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQuantity(bookId: string) {
    setCart((currentCart) => {
      const targetItem = currentCart.find((item) => item.id === bookId);
      if (targetItem && targetItem.quantity > 1) {
        return currentCart.map((item) =>
          item.id === bookId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return currentCart.filter((item) => item.id !== bookId);
      }
    });
  }

  // NEW FUNCTION: Clears the cart state and forces a backend sync
  function clearCart() {
    setCart([]);
    if (currentUser?.id) {
      // Force sync the empty cart to the backend
      saveCartToBackend([]); 
    }
  }

  async function getCartFromBackend() {
    try {
      const res = await fetch(`http://localhost:3000/users/${currentUser?.id}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.cart)) {
          const validCart = data.cart.filter(
            (item: any) => item.id && typeof item.quantity === "number"
          );
          setCart(validCart);
        }
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }

  // UPDATED: Function now accepts an optional 'cartData' argument
  async function saveCartToBackend(cartData?: CartItem[]) {
    // Use the argument if provided, otherwise use the state
    const cartToSave = cartData !== undefined ? cartData : cart; 

    // Skip saving if not logged in or cart is empty and we're just syncing state
    if (!currentUser?.id) return;
    
    try {
      const res = await fetch(`http://localhost:3000/users/${currentUser?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // Use the passed-in cart or the state cart
        body: JSON.stringify({ ...currentUser, cart: cartToSave }), 
      });
      if (res.ok) {
        console.log(`Cart synced successfully. Items: ${cartToSave.length}`);
      } else {
        console.error("Failed to sync cart. Status:", res.status);
      }
    } catch (error) {
      console.error("Failed to sync cart:", error);
    }
  }

  function openCart() {
    setIsCartOpen(true);
    getCartFromBackend();
  }

  function closeCart() {
    setIsCartOpen(false);
    saveCartToBackend();
  }

  return (
    <cartContextObj.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        isCartOpen,
        openCart,
        closeCart,
        // ADDED
        clearCart, 
      }}
    >
      {children}
    </cartContextObj.Provider>
  );
}

export default CartContext;