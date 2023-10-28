import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
const time=500;

// In this component we are passing delete and edit option for each todo

function Todo({ task, toggleComplete, deleteTodo, editTodo, isDeleted }) {

  //  state management
    // console.log(task); // just for debugging
  const [isTaskDeleted, setIsTaskDeleted] = useState(false);

  const deleteTask = (id) => {
    setIsTaskDeleted(true);
    // console.log("deleteTask function called");
    setTimeout(() => {
      setIsTaskDeleted(false);
      // console.log("Task animation completed, deleting task");
      deleteTodo(id);
    }, time-10);
  }

  useEffect(() => {
    if (isDeleted) {
      setIsTaskDeleted(true);
      // console.log("Task marked as deleted");
      setTimeout(() => {
        setIsTaskDeleted(false);
        // console.log("Task animation completed, deleting task");
        deleteTodo(task.id);
      }, time);
    }
  }, [isDeleted, task.id, deleteTodo]);

  return (
    <div className={`Todo ${isTaskDeleted ? 'slide-out' : ''}`}>
      <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed' : ''}`}>
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon icon={faPenSquare} onClick={() => editTodo(task.id)} className='fontIcon' />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(task.id)} className='fontIcon' />
      </div>
    </div>
  );
}

export default Todo;
