import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/userdelete/${id}`
      );

      if (response.data) {
        // If the document was deleted successfully
        console.log("User deleted:", response.data);
        window.location.reload();
      } else {
        // If no document was found (response.data is null)
        console.log("Invalid ID Number");
      }
    } catch (err) {
      console.error("Error while deleting user:", err);
    }
  };

  return (
    <>
      <div className="d-flex vw-100 vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <Link
                        to={`/update/${user._id}`}
                        className="btn btn-success"
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;
