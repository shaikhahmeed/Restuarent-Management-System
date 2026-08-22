import { useEffect, useState } from "react";
import API from "../api/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/users");

      console.log(
        "Users:",
        response.data
      );

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

  return (
    <div>

      <h1>User Management</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (

        <div>

          {users.map((user) => (

            <div key={user._id}>

              <h2>
                {user.name}
              </h2>

              <p>
                Email: {user.email}
              </p>

              <p>
                Role: {user.role}
              </p>

              <p>
                Created:{" "}
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </p>

              <hr />

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Users;