// following https://www.youtube.com/watch?v=w7ejDZ8SWv8
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import EmptyTasks from "./components/EmptyTasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";
// functions with hooks tend to be the default now
function App() {
  // cannot use class, must use className
  // cannot use for, must use htmlFor
  // can use empty brackets for no root <> </>
  const [showAddTask, setShowAddTask] = useState(false);
  const [state, setStatus] = useState({
    history: [[]],
  });

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks(); // because this is async
      console.log(tasksFromServer);
      setStatus({ history: [tasksFromServer] });
    };

    getTasks();

    // fetchTasks();
  }, []); // the empty array is for any element you want to check to update this effect. Here its unused.

  // fetchTasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks"); // await the promise
    const data = await res.json();

    return data;
  };
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    console.log(id);
    const newTask = { id, ...task };
    const oldTasks = state.history[state.history.length - 1];
    const newTasks = oldTasks.concat(newTask);
    const newHistory = state.history.concat([newTasks]);
    setStatus({
      history: newHistory,
    });
    // need to populate new task from form content,
    // need to clear form entries for new one to be submitted.
  };

  //Delete Task
  const deleteTask = (id) => {
    // console.log("delete", id, state.history);
    // console.log("what I plan to change history to", history.concat([tasks]));
    const lastTasks = state.history[state.history.length - 1];
    // filter out tasks which have the id given to the delete function.
    const newTasks = lastTasks.filter((task) => task.id !== id);

    const newHistory = state.history.concat([newTasks]);
    setStatus({
      history: newHistory,
    });
  };

  const undo = () => {
    const tempHistory = state.history.slice(0, state.history.length - 1);
    setStatus({
      history: tempHistory,
    });
  };

  const onToggleReminder = (id) => {
    console.log("toggle", id);
    const lastTasks = state.history[state.history.length - 1];
    const newTasks = lastTasks.map((task) => {
      if (task.id === id) {
        return {
          ...task, // this line copies over the rest of the task
          reminder: !task.reminder, // this updates the reminder so that it is the opposite of what it was
        };
      }
      return task;
    });
    const newHistory = state.history.concat([newTasks]);
    setStatus({
      history: newHistory,
    });
  };

  return (
    // here we work with the fundamental principle that states get passed down and
    // actions get passed up.
    <div className="container">
      <Header
        title="Task Tracker"
        onAdd={() => setShowAddTask(!showAddTask)}
        isShowAddTask={showAddTask}
        onClickUndo={undo}
        tasksLeft={state.history.length}
      />
      {showAddTask ? <AddTask onAdd={addTask} /> : ""}
      {state.history[state.history.length - 1].length > 0 ? (
        <Tasks
          tasks={state.history[state.history.length - 1]}
          onDelete={deleteTask}
          onToggleReminder={onToggleReminder}
        />
      ) : (
        <EmptyTasks />
      )}
    </div>
  );
}

export default App;
