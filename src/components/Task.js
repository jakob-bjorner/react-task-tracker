import { FaTimes } from "react-icons/fa";
// making the template literal for adding the second class works in the div here for making the reminder style have a green bar
// through css.

const Task = ({ task, onDelete, onToggleReminder }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggleReminder(task.id)}
    >
      <h3>
        {task.text}
        <FaTimes
          style={{ fontSize: 35, color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
