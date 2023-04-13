import React, { useState } from 'react';
// import React, { useState } from 'react';
import "./todo.css"

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setInputValue(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().getTime();
    const dueDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // Due date is 24 hours from now
    const status = getStatus(dueDate);
    setTodos([...todos, { text: inputValue, timestamp, dueDate, status }]);
    setInputValue('');
  };

  const handleDelete = (timestamp) => {
    const newTodos = todos.filter((todo) => todo.timestamp !== timestamp);
    setTodos(newTodos);
  };

  const getStatus = (dueDate) => {
    const now = new Date();
    if (dueDate < now) {
      return 'OVERDUE';
    } else if (dueDate.getDate() === now.getDate() && dueDate.getMonth() === now.getMonth() && dueDate.getFullYear() === now.getFullYear()) {
      return 'OPEN';
    } else {
      return 'WORKING';
    }
  };

  const handleModify = (timestamp, newText) => {
    const newTodos = todos.map((todo) => {
      if (todo.timestamp === timestamp) {
        const status = getStatus(todo.dueDate);
        return { ...todo, text: newText, status };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortOrder(value);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilterValue(value);
  };

  const sortedTodos = todos.slice().sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.timestamp - b.timestamp;
    } else {
      return b.timestamp - a.timestamp;
    }
  });

  const filteredTodos = sortedTodos.filter((todo) => {
    return todo.text.toLowerCase().includes(filterValue.toLowerCase());
  });

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input  className='searchbox' type="text" value={inputValue} onChange={handleInputChange} maxLength={100} />
        <button className='addbutton' type="submit">Add Todo</button>
      </form>

      <div className='flex'> 
      <div className='sort'>
        <label  htmlFor="sort-order">Sort Order:</label>
        <select id="sort-order" value={sortOrder} onChange={handleSort}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        </div>
        <div className='sort'>
        <label  htmlFor="filter-text">Filter:</label>
        <input type="text" id="filter-text" value={filterValue} onChange={handleFilter} />
      </div>
      </div>
      <ul className='box'>
        {filteredTodos.map((todo) => (
          <li  key={todo.timestamp}>

         
            <span >{todo.text}</span>
           
            

           
            <span >({new Date(todo.timestamp).toLocaleString()})</span>
            

            <span>Status: {todo.status}</span>

            
            <button onClick={() => handleModify(todo.timestamp, prompt('Enter new text', todo.text))}>
              Modify
            </button>
            <button onClick={() => handleDelete(todo.timestamp)}>Delete</button>
            
           
          </li>
        ))}
      </ul>
    </div>
  );
}







export default TodoList;
