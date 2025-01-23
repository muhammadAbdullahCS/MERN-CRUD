import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getuser/${id}`);
        console.log(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setAge(response.data.age);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchId();
  }, [id]);

  const Update = (e) => {
    e.preventDefault(); // Prevents the page reload
    console.log("function is running");

    axios
      .put(`http://localhost:3001/updateuser/${id}`, { name, email, age }) // Fix: use put, add '/'
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="d-flex vw-100 vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={Update}>
            <h2>Update User</h2>
            <div className="mb-2">
              <label htmlFor="">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter Name"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter Email"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Age</label>
              <input
                type="text"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                placeholder="Enter Age"
                className="form-control"
              />
            </div>
            <button className="btn btn-success" type="submit">
              {" "}
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
