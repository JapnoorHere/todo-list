import React, { useEffect, useState } from 'react'

import './App.css';

const App = () => {

  const[input,setInput] = useState('')
  const[todo,setTodo] = useState([])
  const [updateMode,setUpdateMode] = useState(false);
  const [updateId,setUpdateId] = useState(null);
  const [updateValue,setUpdateValue] = useState('');

  const handleInput = (e)=>{
    setInput(e.target.value);
  }

  const addTodo = (e)=>{
    e.preventDefault()
    if(!input) return;
    const newTodo = {
      id : new Date().getTime(),
      todo : input
    }
    setTodo([...todo,newTodo]);

    
  }

  useEffect(()=>{
    console.log(todo);
    setInput('')
  },[todo])

  const doneTodo = (id)=>{
    setTodo(todo.filter((t)=> {return t.id !== id}))
  }

  const handleUpdateValue = (e)=>{
    setUpdateValue(e.target.value);
  }

  const enterUpdateMode=(id,text)=>{
    setUpdateMode(true);
    setUpdateId(id);
    setUpdateValue(text);
  }
  
  const updateTodo = ()=>{
    const update = todo.map((t)=>{
      if(t.id === updateId){
        return {...todo,todo:updateValue}
      }
      return t;
    })

    setTodo(update);
    setUpdateMode(false);
    setUpdateId(null);
    setUpdateValue('');
  }

  return (
    <div className='main'>
      <div className='container'>
          <h1>TODO List</h1>
          <input type='text' placeholder='Todo' className='input' id='add-input' value={input} onChange={handleInput}/>

          {
            updateMode ?(
              <div className='update-container'>
                <input type='text' value={updateValue} onChange={handleUpdateValue} className='input' id='update-input'/>
                <button className='btn' onClick={updateTodo} id='update-btn'>Update</button>
              </div>
            ):(
              <button className='btn' id='add-btn' onClick={addTodo}>Add</button>
            )

          }


          <ul className='todo-list'>
              {
                todo.map((t)=>{
                  return <li key={t.id}>
                    <p>{t.todo}</p>
                    <button className='update-btn' onClick={()=>enterUpdateMode(t.id,t.todo)}>Update</button>
                    <button className='delete-btn' onClick={()=>doneTodo(t.id)}>Done</button>
                  </li>
                })
              
              }
          </ul>
      </div>
    </div>
  )
}

export default App
