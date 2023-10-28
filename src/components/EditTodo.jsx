import { useState } from "react";
import Alert from "./AlertBox/Alert";

function EditTodo({editTodo,task}) {
  // importing the prop from parent to child and then  passing back the values to parent
  const [value, setValue] = useState(task.task);
  const [showAlert, setShowAlert] = useState(false);
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // using this to stop the empty or default form submision
    const trimValue=value.trim();
    // using this to stop the empty or default form submision
    if(!trimValue){
      handleShowAlert(); 
      return;
 }
    editTodo(value,task.id); // using this to pass value back

    setValue(""); // here inout field will be cleared
  };
  return (
     <div className="TodoForm EditTodo" >
    <form  onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={task.task}
        
        className="todo-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {/* for taking the input form the user */}
      <button type="submit" className="todo-btn ">
        Update
      </button>
    </form>

    {showAlert && (
        <Alert
          message="Please enter a task before updating."
          type="error"
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
}

export default EditTodo