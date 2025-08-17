import './App.css';
import Header from './MyComponents/Header';
import { Todos } from './MyComponents/Todos';
import Footer from './MyComponents/Footer';
import { AddTodo } from './MyComponents/AddTodo';
import { About } from './MyComponents/About';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    try{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  } catch(error){
    console.log("Error or parsing local storage data:", error);
    initTodo = [];
    localStorage.removeItem("todos"); //Clear corrupted data 
  }
}
  const onDelete = (todo) => {
    console.log("I am on delete of todo", todo);
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);
    // Deleting this way will not work in react 

    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo = (title, desc) => {
    let sno;
    console.log("I am adding this todo", title, desc)
    if (todos.length == 0) {
      sno = 0;
    }
    const myTodo = {
      sno: todos.length + 1,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <Router>
        <div style={{marginLeft: '40px'}}>
      <Header title="MyTodosList" searchBar={true} />
      <Routes>
          <Route path="/" element = {
              <>
              <AddTodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} />
              </>
          }>
          </Route>
          <Route path="/about"
            element = {<About />}/>
        </Routes>

      <Footer />
      </div>
      </Router>
    </>
  );
}

export default App;