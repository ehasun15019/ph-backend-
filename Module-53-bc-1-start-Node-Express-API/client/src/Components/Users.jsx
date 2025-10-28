import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Users = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {user.map((u) => (
        <p key={u.id}>{u.name}</p>
      ))}

      <div>
        <h3>Add a user</h3>

        <form>
          <input type="text" placeholder="name" />
          <br />
          <input type="email" placeholder="email" />

          <br />
          <button>Add to</button>
        </form>
      </div>
    </div>
  );
};

export default Users;
