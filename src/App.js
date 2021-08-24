// following https://www.youtube.com/watch?v=w7ejDZ8SWv8
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import EmptyTasks from "./components/EmptyTasks";
import { useState } from "react";
// functions with hooks tend to be the default now
function App() {
  // cannot use class, must use className
  // cannot use for, must use htmlFor
  // can use empty brackets for no root <> </>

  const [state, setStatus] = useState({
    history: [
      [
        {
          id: 1,
          text: "Doctors Appointment",
          day: "Feb 5th at 2:30pm",
          reminder: true,
        },
        {
          id: 2,
          text: "Meeting at School",
          day: "Feb 6th at 1:30pm",
          reminder: true,
        },
        {
          id: 3,
          text: "Food Shopping",
          day: "Feb 5th at 2:30pm",
          reminder: false,
        },
      ],
    ],
  });
  //Delete Task
  const deleteTask = (id) => {
    // console.log("delete", id, state.history);
    // console.log("what I plan to change history to", history.concat([tasks]));
    const lastTasks = state.history[state.history.length - 1];
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

  return (
    <div className="container">
      <Header
        title="Task Tracker"
        onClickUndo={undo}
        tasksLeft={state.history.length}
      />
      {state.history[state.history.length - 1].length > 0 ? (
        <Tasks
          tasks={state.history[state.history.length - 1]}
          onDelete={deleteTask}
        />
      ) : (
        <EmptyTasks />
      )}
    </div>
  );
}

export default App;
