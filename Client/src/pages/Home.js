import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [username, setUsername] = useState("");
  const [userphone, setUserphone] = useState("");
  const [users, setUsers] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const fetchUsers = () => {
    axios
      .get(`${apiUrl}/users`)
      .then((response) => {
        setUsers(response.data);
        console.log(users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error.message);
        // Handle error and display appropriate message to the user
      });
  };

  useEffect(() => {
    // Fetch the users data when the component mounts
    fetchUsers();
  },);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, userphone };
    if (!userData.userphone) {
      // You can add a validation to ensure the phone number is not empty
      console.error("Phone number cannot be empty");
      return;
    }
    axios
      .post(`${apiUrl}/addUser`, userData)
      .then((response) => {
        console.log(response.data.message);
        fetchUsers();
        setUsername("");
        setUserphone("");
        // You can add any success message or redirect to a success page here
      })
      .catch((error) => {
        console.error("Error adding user:", error.message);
        // Handle error and display appropriate message to the user
      });
  };
  return (
    <div>
      <div>
        <h1>Add User</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Userphone:</label>
            <input
              type="text"
              value={userphone}
              onChange={(e) => setUserphone(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <h1>Existing Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              Username: {user.username}, Phone Number: {user.phone_number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
