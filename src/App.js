
// import { response } from 'express';
// import { Router } from '@angular/router';
import { useEffect, useState } from 'react';
import { Button, EditableText, InputGroup, Toaster } from '@blueprintjs/core';
import './App.css';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';

const AppToaster = Toaster.create({
  position: "top"
})

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [ctime, setEctime] = useState(0);




  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => setUsers(json))
  }, [])

  function addUser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            website
          }),
          headers: {
            "content-Type": "application/json;charset=UTF-8"
          }
        }
      ).then((response) => response.json())
        .then(data => {
          setUsers([...users, data])
          AppToaster.show({
            message: "new user added successfully",
            intent: "success",
            timeout: 3000
          })
        })
      setNewName("")
      setNewEmail("")
      setNewWebsite("")
    }
  }

  function onChangeHandler(id, key, value) {
    setUsers((users) => {
      return users.map(user => {
        return user.id === id ? { ...user, [key]: value } : user;
      })
    })
  }

  function updateUser(id) {
    const user = users.find((user) => user.id === id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "content-Type": "application/json;charset=UTF-8"
        }
      }
    ).then((response) => response.json())
      .then(data => {
        AppToaster.show({
          message: "user update successfully",
          intent: "success",
          timeout: 3000
        })
      })
  }

  function deleteUser(id) {
    alert(`are u sure want to delete this id ${id}`);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "DELETE",
      })
      .then((response) => response.json())
      .then(data => {
        setUsers((users) => {
          return users.filter(user => user.id !== id)
        })
        AppToaster.show({
          message: "user details deleted successfully",
          intent: "success",
          timeout: 3000
        })
      })
  }

  
// setInterval(()=>setEctime(pre => pre === 0 ? 1 : 0),3000)

  return (
    <div className="App">
      <table className='bp4-html-table modifier'>
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Action</th>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td><EditableText onChange={value => onChangeHandler(user.id, 'email', value)} value={user.email} /></td>
              <td><EditableText onChange={value => onChangeHandler(user.id, 'website', value)} value={user.website} /></td>
              <td>
                <Button intent='success' onClick={() => updateUser(user.id)}>Update</Button>
                &nbsp; &nbsp;
                <Button intent='danger' onClick={() => deleteUser(user.id)}>Delete</Button>
              </td>
            </tr>
          )}

        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td><InputGroup
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder='Enter name'
            /></td>
            <td><InputGroup
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder='Enter Email id'
            /></td>
            <td><InputGroup
              value={newWebsite}
              onChange={(e) => setNewWebsite(e.target.value)}
              placeholder='Enter website url'
            /></td>
            <td>
              <Button intent='primary' onClick={addUser}>Add user</Button>
            </td>

          </tr>
        </tfoot>
      </table>

      <div>
        <p >{ctime}</p>
        <button onClick={() => setEctime(pre => pre === 0 ? 1 : 0)}>change time</button>
      </div>
    </div>
  );
}

export default App;
