import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { cartContextObj, type CartItem } from "../Context/CartContext";
import { userContextObj } from "../Context/UserContext";
import { orderContextObj, type OrderItem } from "../Context/OrderContext";
import type { AddressType } from "../components/UserRegistration";
import { bookContextObj } from "../Context/BookContext";
import { data } from "react-router";

// Initial state for a new address
const NEW_ADDRESS_INITIAL_STATE: AddressType = {
  type: "Home",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  isDefault: false,
  id: "new",
};

// Utility to generate order ID
const generateOrderId = () =>
  Math.random().toString(36).substring(2, 12).toUpperCase();

function BuyNow() {
  // --- CONTEXT: FIXED PLACEMENT ---
  const { currentUser, addAddress } = useContext(userContextObj);
  const { cart } = useContext(cartContextObj);
  const { addOrder, clearCart, closeCart } = useContext(orderContextObj);
  // ✅ CORRECT: useContext must be called at the top level
  const { data: inventoryData,editBook } = useContext(bookContextObj); // Renamed 'data' to 'inventoryData' for clarity

  // --- STATE ---
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const initialAddressId =
    currentUser?.address?.find((addr) => addr.isDefault)?.id ||
    currentUser?.address?.[0]?.id ||
    NEW_ADDRESS_INITIAL_STATE.id;
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    initialAddressId
  );
  const currentSelectedAddress = currentUser?.address?.find(
    (addr) => addr.id === selectedAddressId
  );
  const [addressForm, setAddressForm] = useState<AddressType>(
    currentSelectedAddress
      ? { ...currentSelectedAddress }
      : NEW_ADDRESS_INITIAL_STATE
  );
  const [payment, setPayment] = useState("");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });
  const isNewAddressSelected = selectedAddressId === "new";

  // --- VALIDATION FUNCTION ---
  // Moved outside handleOrderPlacement for clarity, but it uses the inventoryData closure
  function validateOrderAgainstInventory(order: OrderItem): boolean {
    const inventoryMap = new Map(
      inventoryData.map((book) => [book.bookname, book])
    );
    for (const item of order.items) {
      const requestedBookName = item.bookname;
      const requestedQuantity = item.quantity;

      const inventoryBook = inventoryMap.get(requestedBookName);

      // Check if book exists in inventory
      if (!inventoryBook) {
        alert(
          `❌ Inventory Error: Book "${requestedBookName}" not found in stock data.`
        );
        return false;
      }
      const availableQuantity = inventoryBook.quantity;
      if (requestedQuantity > availableQuantity) {
        alert(
          `❌ Too many books requested for "${requestedBookName}". 
           Requested: ${requestedQuantity}, Available: ${availableQuantity}.`
        );
        return false; // Immediately return false on the first validation failure
      }
    }
    console.log("✅ Order validation successful. Proceeding to fulfillment.");
    return true;
  }

  // --- HANDLERS ---
  const handleAddressChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCardDetailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSave = (e: FormEvent) => {
    e.preventDefault();

    if (!addressForm.street || !addressForm.city || !addressForm.zipCode) {
      alert("Please fill in all required address fields.");
      return;
    }

    // Assign a proper ID if it's new, otherwise keep existing ID
    const finalAddress: AddressType =
      addressForm.id === "new"
        ? { ...addressForm, id: Date.now().toString() }
        : addressForm;

    addAddress(finalAddress);
    setSelectedAddressId(finalAddress.id);
    setAddressForm(finalAddress); // Update form state to reflect the saved address details

    alert(
      `Address ${isNewAddressSelected ? "saved" : "updated"} successfully! Now you can place your order.`
    );
  };

  const handleOrderPlacement = async (e: FormEvent) => {
    e.preventDefault();
    setIsPlacingOrder(true); // 🆕 Start loading state immediately

    // --- Validation Checks ---
    const finalShippingAddress = currentUser?.address?.find(
      (addr) => addr.id === selectedAddressId
    );

    if (!finalShippingAddress) {
      alert("Please select or save a valid shipping address first.");
      setIsPlacingOrder(false);
      return;
    }
    if (!payment) {
      alert("Please select a payment method.");
      setIsPlacingOrder(false);
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty. Cannot place an order.");
      setIsPlacingOrder(false);
      return;
    }

    let paymentDetails = {};
    if (payment === "credit") {
      if (!formData.cardNumber || !formData.cvv || !formData.expiryDate) {
        alert("Please fill in all required card details.");
        setIsPlacingOrder(false);
        return;
      }
      paymentDetails = formData;
    }

    // --- Order Object Creation ---
    const newOrder: OrderItem = {
      id: generateOrderId(),
      items: cart.map(({ bookname, quantity, price, id }) => ({
        bookname,
        quantity,
        price,
        id, // Ensure you pass the book ID for inventory updates
      })),
      username: currentUser?.username || "Guest",
      createdAt: new Date().toISOString(),
      shippingAddress: finalShippingAddress,
      paymentMethod: payment,
      paymentDetails,
    };

    // --- INVENTORY VALIDATION ---
    if (!validateOrderAgainstInventory(newOrder)) {
      setIsPlacingOrder(false); // Stop loading if validation fails
      return;
    }

    // --- Order Submission ---
    console.log("Placing order:", newOrder.id);
    try {
      // ⚠️ Note: In a real application, inventory deduction would happen on the server.
      // For this frontend exercise, we proceed with the POST request.
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (res.ok) {
        addOrder(newOrder);
        clearCart();
        closeCart();
        alert("Order placed successfully! 🎉");
        console.log("Order placed successfully and cart cleared.");
        //taking all the available books in the cart
        let selectedBooks=newOrder.items.map(item=>({bookname:item.bookname,noOfBooks:item.quantity}))
        inventoryData.map(bookIn=>(
            selectedBooks.map(book=>book.bookname.includes(bookIn.bookname)?editBook({...bookIn,quantity:bookIn.quantity-book.noOfBooks}):console.log("ok"))
        ))
        
      } else {
        alert("Failed to place order. Please try again.");
        console.error("Failed to place order. Status:", res.status);
      }
    } catch (error) {
      alert("An error occurred while placing the order.");
      console.error("Error placing order:", error);
    } finally {
      setIsPlacingOrder(false); // 🆕 Ensure loading state stops regardless of success/fail
    }
  };

  const handleAddressSelect = (id: string) => {
    setSelectedAddressId(id);
    const addr =
      id === "new"
        ? NEW_ADDRESS_INITIAL_STATE
        : currentUser?.address?.find((a) => a.id === id);
    if (addr) setAddressForm({ ...addr });
  };

  const isFormAddressSaved = currentUser?.address?.some(
    (a) => a.id === addressForm.id && a.id !== "new"
  );
  // Determine if the currently selected address is valid for checkout
  const isSelectedAddressReady = !isNewAddressSelected && currentUser?.address?.some(a => a.id === selectedAddressId);

  return (
    <div className="container py-5">
      <h2 className="mb-4">User Checkout</h2>
      <div className="row g-4">
        
        {/* Contact Info */}
        <div className="col-md-8">
          <div className="card p-4">
            <h4>Contact Information</h4>
            <input
              type="email"
              className="form-control mb-3"
              placeholder={currentUser?.email || "Email"}
              disabled
            />
            <input
              type="text"
              className="form-control mb-3"
              value={currentUser?.username || "Guest"}
              disabled
            />
          </div>
        </div>
        
        {/* Order Summary (Main action button) */}
        <div className="col-md-4">
          <div className="card p-4 sticky-top" style={{ top: "20px" }}>
            <h4>Order Summary</h4>
            <p className="text-muted">Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</p> 
            
            <button
              type="button" 
              className="btn btn-success w-100 mt-3"
              onClick={handleOrderPlacement}
              // ✅ Refined disabled check: Must have a payment method AND a *saved* address selected.
              disabled={!payment || !isSelectedAddressReady || isPlacingOrder || cart.length === 0} 
            >
              {isPlacingOrder ? (
                <>Placing Order... <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></>
              ) : (
                "Complete Order"
              )}
            </button>
            
            {/* Conditional feedback messages */}
            {cart.length === 0 && <p className="text-danger small mt-2">❗ Your cart is empty.</p>}
            {!payment && <p className="text-danger small mt-2">❗ Select a payment method.</p>}
            {!isSelectedAddressReady && <p className="text-danger small mt-2">❗ Select a saved address to proceed.</p>}

          </div>
        </div>

        {/* Address Selection */}
        <div className="col-md-8">
          <div className="card p-4">
            <h4>Select Shipping Address 🏠</h4>
            
            {/* Saved Addresses */}
            {currentUser?.address?.map((addr) => (
              <div key={addr.id} className="form-check mb-2">
                <input
                  type="radio"
                  name="savedAddress"
                  value={addr.id}
                  checked={selectedAddressId === addr.id}
                  onChange={() => handleAddressSelect(addr.id)}
                  className="form-check-input"
                  id={`addr-${addr.id}`}
                />
                <label className="form-check-label" htmlFor={`addr-${addr.id}`}>
                  <span className="fw-bold">{addr.type}</span>: {addr.street}, {addr.city} - {addr.zipCode}
                  {addr.isDefault && <span className="badge bg-primary ms-2">Default</span>}
                </label>
              </div>
            ))}

            {/* Option to Add New Address */}
            <div className="form-check mt-3 pt-2 border-top">
              <input
                type="radio"
                name="savedAddress"
                value="new"
                checked={isNewAddressSelected}
                onChange={() => handleAddressSelect("new")}
                className="form-check-input"
                id="addr-new"
              />
              <label className="form-check-label fw-bold" htmlFor="addr-new">
                Add a New Address
              </label>
            </div>
          </div>
        </div>

        {/* Shipping Address Form */}
        <div className="col-md-8">
          <div className="card p-4">
            <h4>{isNewAddressSelected ? "Enter New Address" : "Update Selected Address"}</h4>
            
            <form onSubmit={handleAddressSave}>
              <select
                name="type"
                className="form-select mb-3"
                value={addressForm.type}
                onChange={handleAddressChange}
                required
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="street"
                className="form-control mb-3"
                placeholder="Street Address*"
                value={addressForm.street}
                onChange={handleAddressChange}
                required
              />
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="city"
                    className="form-control mb-3"
                    placeholder="City*"
                    value={addressForm.city}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    name="state"
                    className="form-control mb-3"
                    placeholder="State*"
                    value={addressForm.state}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    name="zipCode"
                    className="form-control mb-3"
                    placeholder="Zipcode*"
                    value={addressForm.zipCode}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  name="isDefault"
                  className="form-check-input"
                  checked={addressForm.isDefault}
                  onChange={handleAddressChange}
                  id="isDefaultCheck"
                />
                <label className="form-check-label" htmlFor="isDefaultCheck">
                  Set as default address
                </label>
              </div>
              
              {/* SAVE ADDRESS BUTTON */}
              <button type="submit" className="btn btn-warning w-100">
                {isNewAddressSelected ? "Save New Address" : "Update Address"}
              </button>
            </form>
          </div>
        </div>

        {/* Payment Method */}
        <div className="col-md-8">
          <div className="card p-4">
            <h4>Payment Method 💳</h4>
            
            <div className="form-check mb-2">
              <input
                type="radio"
                name="payment"
                value="credit"
                checked={payment === "credit"}
                onChange={(e) => setPayment(e.target.value)}
                className="form-check-input"
                id="credit"
              />
              <label className="form-check-label" htmlFor="credit">
                Credit or Debit Card
              </label>
            </div>
            
            <div className="form-check mb-3">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={payment === "online"}
                onChange={(e) => setPayment(e.target.value)}
                className="form-check-input"
                id="online"
              />
              <label className="form-check-label" htmlFor="online">
                PayPal / Other Online Payment
              </label>
            </div>
            
            {/* Credit Card Form (Only visible if 'credit' is selected) */}
            {payment === "credit" && (
              <div className="p-3 border rounded bg-light mt-3">
                <h5 className="mb-3">Enter Card Details</h5>
                <input
                  type="number"
                  name="cardNumber"
                  className="form-control mb-3"
                  placeholder="Card Number"
                  onChange={handleCardDetailChange}
                  value={formData.cardNumber}
                  required={payment === "credit"}
                />
                <input
                  type="text"
                  name="expiryDate"
                  className="form-control mb-3"
                  placeholder="Expiry Date (MM/YY)"
                  onChange={handleCardDetailChange}
                  value={formData.expiryDate}
                  required={payment === "credit"}
                />
                <input
                  type="number"
                  name="cvv"
                  className="form-control mb-3"
                  placeholder="CVV"
                  maxLength={4}
                  onChange={handleCardDetailChange}
                  value={formData.cvv}
                  required={payment === "credit"}
                />
                <input
                  type="text"
                  name="name"
                  className="form-control mb-3"
                  placeholder="Name on Card"
                  onChange={handleCardDetailChange}
                  value={formData.name}
                  required={payment === "credit"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyNow;