import { useState } from "react";
import Alert from "./AlertBox/Alert.jsx";


function TodoForm({addTodo}) {
  // importing the prop from parent to child and then  passing back the values to parent
  const [value, setValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const trimValue=value.trim();

    // using this to stop the empty or default form submision
    if(!trimValue){
      // console.log("@@@ inside trim");
      handleShowAlert(); 
      return;
 }

//  console.log(trimValue);
    addTodo(trimValue); // using this to pass value back

    setValue(""); // Handling after adding the task
  };
  return (

    <div className="TodoForm" >
  
    <form  onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter the task of the day...."
        className="todo-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {/* for taking the input form the user */}
      <button type="submit" className="todo-btn">
        Add
      </button>
    </form>
    {showAlert && (
        <Alert
          message="Please enter a task before submitting."
          type="error"
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
}

export default TodoForm;
