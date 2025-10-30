import React, { useContext, useEffect, useState, useMemo } from "react";
import { orderContextObj, type OrderItem } from "../Context/OrderContext";


function OrderManagement() {
  const { orders, getOrders } = useContext(orderContextObj);

  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("dateDesc"); // Options: dateDesc, dateAsc, totalDesc, totalAsc

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setIsLoading(false);
         getOrders();
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } 
    };

    fetchAllOrders();
  }, []);

  const processedOrders = useMemo(() => {
    const ordersWithTotals = orders.map((order) => {
      const total = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return { ...order, total };
    });

    return ordersWithTotals.sort((a, b) => {
      switch (sortBy) {
        case "dateAsc":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "totalDesc":
          return b.total - a.total;
        case "totalAsc":
          return a.total - b.total;
        case "dateDesc":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [orders, sortBy]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Shipped": return "bg-info";
      case "Delivered": return "bg-success";
      case "Cancelled": return "bg-danger";
      default: return "bg-warning text-dark"; // Pending
    }
  };

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Fetching all orders for management...</p>
      </div>
    );
  }

  if (processedOrders.length === 0) {
    return (
      <div className="container py-5">
        <h2 className="mb-4">Order Management</h2>
        <div className="alert alert-warning">No orders have been placed yet.</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Order Management Dashboard</h2>

      {/* Sorting Controls */}
      <div className="mb-3 d-flex align-items-center">
        <label htmlFor="sortSelect" className="form-label me-2 mb-0">Sort By:</label>
        <select
          id="sortSelect"
          className="form-select w-auto"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="dateDesc">Date (Newest First)</option>
          <option value="dateAsc">Date (Oldest First)</option>
          <option value="totalDesc">Total (High to Low)</option>
          <option value="totalAsc">Total (Low to High)</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {processedOrders.map((order) => (
              <tr key={order.id}>
                <td><span className="text-primary fw-bold">{order.id}</span></td>
                <td>{order.username}</td>
                <td>
                  {new Date(order.createdAt).toLocaleDateString()}
                  <div className="small text-muted">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </div>
                </td>
                <td>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                <td>₹{order.total.toFixed(2)}</td>
                <td>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderManagement;
