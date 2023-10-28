import "./Alert.css";

const Alert = ({ message, type, onClose }) => {
  return (
    <div className="alert-overlay">
    <div className={`alert ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
  );
};

export default Alert;
