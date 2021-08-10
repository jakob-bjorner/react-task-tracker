
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import { useState } from 'react'
// functions with hooks tend to be the default now
function App() {
  // cannot use class, must use className
  // cannot use for, must use htmlFor
  // can use empty brackets for no root <> </>
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1:30pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 5th at 2:30pm',
      reminder: false,
    }
  ]);
  return (
    <div className="container">
      <Header title="Task Tracker" />
      <Tasks tasks={tasks} />
    </div>
  );
}


export default App;
