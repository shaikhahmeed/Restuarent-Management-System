import { useEffect, useState } from "react";
import API from "../api/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/users");

      console.log("Users:", response.data);

      setUsers(response.data);
    } catch (error) {
      console.error(
        "Failed to load users:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleClass = (role) => {
    if (role === "admin") {
      return "user-role-admin";
    }

    return "user-role-customer";
  };

  return (
    <div className="users-page">

      {/* Page Header */}
      <div className="users-header">
        <div>
          <h1>User Management</h1>
          <p>Manage and view registered system users</p>
        </div>

        <div className="users-count">
          <span>{users.length}</span>
          <small>Total Users</small>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="users-message">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        /* Empty State */
        <div className="users-message empty-users">
          <div className="empty-user-icon">👥</div>
          <h2>No Users Found</h2>
          <p>
            There are currently no registered users.
          </p>
        </div>
      ) : (
        /* Users */
        <div className="users-grid">

          {users.map((user) => (

            <div
              className="user-card"
              key={user._id}
            >

              {/* User Avatar */}
              <div className="user-avatar">
                {user.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              {/* User Information */}
              <div className="user-info">

                <div className="user-name-row">
                  <h2>{user.name}</h2>

                  <span
                    className={`user-role ${getRoleClass(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </div>

                <div className="user-detail">
                  <span className="user-label">
                    Email
                  </span>

                  <strong>
                    {user.email}
                  </strong>
                </div>

                <div className="user-detail">
                  <span className="user-label">
                    Joined
                  </span>

                  <strong>
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </strong>
                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Users;