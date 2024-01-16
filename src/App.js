import { useState } from 'react';
import './App.css';

import data from './mock-data'

function App() {

  const [users,setUsers] = useState(data);
  const [selectedUsers,setSelectedUsers] = useState([]);
  const [highlightedUser,setHighlightedUser] = useState(null);
  const [name,setName] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleOnChange = (e)=>{
    setName(e.target.value);
  }

  const handleClick = ()=>{
    setDropdownVisible(true);
    setHighlightedUser(null)
  }

  const handleKeyDown = (event)=>{
    if(event.key === 'Backspace'){
      if(name===""){
        setHighlightedUser(selectedUsers[selectedUsers.length-1])
        document.getElementById('root').click()
      }
    }
  }

  window.onclick = function(event) {
    if (!event.target.matches('.name-input')) {
      setDropdownVisible(false);
    }
  }

  // window.onkeydown = function(event){
  //   if(event.key === 'Backspace'&&highlightedUser!=null){
  //     removeUser(highlightedUser)
  //     setHighlightedUser(null)
  //   }
  // }

  const addUser = (user)=>{
    setName("")
    setSelectedUsers((prevSelectedUsers)=>[...prevSelectedUsers,user])
  }

  const removeUser = (userToRemove)=>{
    setSelectedUsers((prevSelectedUsers)=>prevSelectedUsers.filter((user)=>userToRemove!==user))
  }

  const highlightUser = (user)=>{
    setHighlightedUser(user);
  }

  return (
    <div className="App">
      <h1 className='heading'>Pick users</h1>
      <div className='container'>
        {/* <div className='chip-container'> */}
          {
            selectedUsers.map((user)=>{
              const style = user===highlightedUser?"chip highlighted":"chip";
              return (
                <div className={style} onClick={()=>highlightUser(user)}>
                  <img src={user.photo} className='chip-photo' alt='profile' />
                  <p style={{fontSize:'medium',color:'grey'}}>{user.name}</p>
                  <p className='remove-button' onClick={()=>removeUser(user)}>X</p>
                </div>
              )
            })
          }
        {/* </div> */}
        <div className='dropdown-container'>
          <input className='name-input' type='text' placeholder='Add new user...' value={name} onChange={handleOnChange} onClick={handleClick} onKeyDown={handleKeyDown}/>
          { isDropdownVisible &&
          <div className='dropdown'>
            {
              users.map((user)=>{
                if(!selectedUsers.includes(user)&&user.name.toLowerCase().includes(name.toLowerCase()))
                return (
                  <div className='user'  onClick={()=>addUser(user)}>
                    <img src={user.photo} className='user-photo' alt='profile' />
                    <p style={{fontWeight:'bold'}}>{user.name}</p>
                    <p style={{fontSize:'medium',color:'grey'}}>{user.email}</p>
                  </div>
                )
              })
            }
          </div>
          }
        </div>
        
      </div>
    </div>
  );
}

export default App;
