// following https://www.youtube.com/watch?v=w7ejDZ8SWv8
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import EmptyTasks from "./components/EmptyTasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
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

  // fetchTask Never used, but used in tutorial
  // const fetchTask = async (id) => {
  //   const res = await fetch(`http://localhost:5000/tasks/${id}`);
  //   const data = await res.json();

  //   return data;
  // };

  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    const oldTasks = state.history[state.history.length - 1];
    const newTasks = [...oldTasks, data];
    setStatus({
      history: state.history.concat([newTasks]),
    });
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // const oldTasks = state.history[state.history.length - 1];
    // const newTasks = oldTasks.concat(newTask);
    // const newHistory = state.history.concat([newTasks]);
    // setStatus({
    //   history: newHistory,
    // });
    // need to populate new task from form content,
    // need to clear form entries for new one to be submitted.
  };

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });

    const lastTasks = state.history[state.history.length - 1];
    // filter out tasks which have the id given to the delete function.
    const newTasks = lastTasks.filter((task) => task.id !== id);

    const newHistory = state.history.concat([newTasks]);
    setStatus({
      history: newHistory,
    });

    // {
    //   "tasks": [
    //     {
    //       "id": 1,
    //       "text": "Doctors Appointment",
    //       "day": "Feb 5th at 2:30pm",
    //       "reminder": true
    //     },
    //     {
    //       "id": 2,
    //       "text": "Meeting at School",
    //       "day": "Feb 6th at 1:30pm",
    //       "reminder": true
    //     },
    //     {
    //       "id": 3,
    //       "text": "Food Shopping",
    //       "day": "Feb 5th at 2:30pm",
    //       "reminder": false
    //     }
    //   ]
    // }
  };

  const undo = async () => {
    // I can set the entire data base every time I undo because they are likely to be small,
    // but this wouldn't scale well. Be warned
    // await fetch(`http://localhost:5000/tasks`, { method: 'DELETE'});
    const currentTasks = state.history[state.history.length - 1];
    const tempHistory = state.history.slice(0, state.history.length - 1);

    setStatus({
      history: tempHistory,
    });
    const updatedTasks = tempHistory[tempHistory.length - 1];

    console.log(currentTasks, updatedTasks);
    // now I need to find tasks in the updated Tasks who are not in the current tasks.
    updatedTasks.map(async (taskUpdated) => {
      if (currentTasks.find((x) => x.id === taskUpdated.id) === undefined) {
        await fetch(`http://localhost:5000/tasks`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(taskUpdated),
        });
      }
    });
    currentTasks.map(async (task) => {
      const taskUpdated = updatedTasks.find((x) => x.id === task.id);
      if (taskUpdated !== undefined) {
        // just update the task in the database.
        if (
          taskUpdated.text !== task.text ||
          taskUpdated.day !== task.day ||
          taskUpdated.reminder !== task.reminder
        ) {
          await fetch(`http://localhost:5000/tasks/${taskUpdated.id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(taskUpdated),
          });
        }
      } else {
        // we need to delete the task
        console.log(currentTasks, task, updatedTasks);
        await fetch(`http://localhost:5000/tasks/${task.id}`, {
          method: "DELETE",
        });
      }
    });
  };

  const onToggleReminder = async (id) => {
    const lastTasks = state.history[state.history.length - 1];
    let toggledTask = {};
    const newTasks = lastTasks.map((task) => {
      if (task.id === id) {
        toggledTask = { ...task, reminder: !task.reminder };
        return {
          ...task, // this line copies over the rest of the task
          reminder: !task.reminder, // this updates the reminder so that it is the opposite of what it was
        };
      }
      return task;
    });
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(toggledTask),
    });
    const newHistory = state.history.concat([newTasks]);
    setStatus({
      history: newHistory,
    });
  };

  return (
    // here we work with the fundamental principle that states get passed down and
    // actions get passed up.
    <Router>
      <div className="container">
        <Header
          title="Task Tracker"
          onAdd={() => setShowAddTask(!showAddTask)}
          isShowAddTask={showAddTask}
          onClickUndo={undo}
          tasksLeft={state.history.length}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
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
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
