import { Outlet, Link } from "react-router-dom";

function CustomerLayout() {
  return (
    <div>
      <nav
        style={{
          background: "#28a745",
          padding: "15px",
          display: "flex",
          gap: "20px",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/my-orders">My Orders</Link>
      </nav>

      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default CustomerLayout;