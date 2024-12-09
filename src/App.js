import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      setUsers(data);
    };
 
    fetchUsers();
  }, []);

  const selectUser = (user) => {
    setSelectedUser(user.id);
  };

  const getUserImg = (userId) => {
    return `https://picsum.photos/seed/${userId}/300`;
  };

  return (
  <div className='wrapper'>
    <head><title>Contacts</title></head>
    <div className='sidebar'>
      <h1>Contacts</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => selectUser(user)}
          className={selectedUser === user.id ? 'selected' : ''}>
            <div className='sidebar-text'>
              <h2>{user.name}</h2>
              <p><strong>Company: </strong>{user.company.name}</p>
            </div>
            <img src={getUserImg(user.id)} alt="Avatar"/>
          </li>
        ))}
      </ul>
    </div>
    <div className='main'>
      {selectedUser ? (
        <>
          <h1>Details</h1>
          <img src={getUserImg(selectedUser)} alt="Avatar"/>
          <h2>{users.find((user) => user.id === selectedUser)?.name}</h2>
          <ul>
            <li>
              <p><strong>Email: </strong>{users.find((user) => user.id === selectedUser)?.email}</p>
            </li>
            <li>
              <p><strong>Phone: </strong>{users.find((user) => user.id === selectedUser)?.phone}</p>
            </li>
            <li>
              <p><strong>City: </strong>{users.find((user) => user.id === selectedUser)?.address.city}</p>
            </li>
          </ul>
            <h2>Company</h2>
            <ul>
              <li className='company'>
                <p>{users.find((user) => user.id === selectedUser)?.company.name}</p>
              </li>
              <li>
                <p><strong>Catchphrase: </strong>{users.find((user) => user.id === selectedUser)?.company.catchPhrase}</p>
              </li>
              <li>
                <p><strong>Goal: </strong>{users.find((user) => user.id === selectedUser)?.company.bs}</p>
              </li>
            </ul>
        </>
      ) : (
        <p>Select a user from the sidebar to see more details.</p>
      )}
    </div>
  </div>
  );
};