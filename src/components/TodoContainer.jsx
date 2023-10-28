import { useState,useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodo from "./EditTodo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList,faEraser } from '@fortawesome/free-solid-svg-icons'

uuidv4(); //init used for generating unique key
const time=500;
function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [isDeleteAllClicked, setIsDeleteAllClicked] = useState(false);
  const [deletedTodos, setDeletedTodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  

  const addTodo = (todo) => {

    if (!todo) {
      alert("please enter task");
      return;
    }
  
    const newTask = {
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false,
    };

    setTodos([newTask, ...todos]);
// adding the data to the local storage so that it didn;t lost on the refresh 
    localStorage.setItem("todos", JSON.stringify([newTask, ...todos]));
    // console.log(todos);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id == id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {

    setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo.id === id ? { ...todo, isDeleted: true } : todo
    )
    );
    
  
  // Using local storage and also updating after each single delete
  setTimeout(() => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  }, time);  
  };
  
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isEditing: !todo.isEditing,
            }
          : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              task,
              isEditing: !todo.isEditing,
            }
          : todo
      )
    );
  };

  // for deleting all the tasks
  const deleteAllTasks = () => {
    
    setIsDeleteAllClicked(true);

   
    setDeletedTodos([...todos]);
    setTimeout(() => {
      setTodos([]);
    }, time); 
    
    // Remove the isDeleteAllClicked state and deleted todos after the animation
    setTimeout(() => {
      setIsDeleteAllClicked(false);
      setDeletedTodos([]);
    }, time);
    
    localStorage.removeItem("todos");
  };


  return (
    <div className="TodoWrapper">
      <h1 >To-Do
      <FontAwesomeIcon icon={faClipboardList} style={{marginLeft:"20px"}} />
      </h1>
      <TodoForm addTodo={addTodo} />

        {/* Conditionally render the "Delete All Tasks" button */}
    {todos.length > 0 && (
      <button onClick={deleteAllTasks} className="deleteAll-btn todo-btn">
        <FontAwesomeIcon icon={faEraser} style={{ marginRight: '5px' }} />
        <span>Delete All</span>
        
      </button>
    )}

      {/* here we are just passing props and calling other component so that we can edit and delete task from the todo list */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodo editTodo={editTask} task={todo} key={todo.id}/>
        ) : (
          <Todo
            task={todo}
            key={todo.id}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            isDeleted={deletedTodos.includes(todo)}
          />
        )
      )}
    </div>
  );
}

export default TodoContainer;
