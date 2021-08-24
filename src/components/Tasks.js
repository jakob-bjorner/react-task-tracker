import Task from './Task'

// could have tasks stored in redux, or somthing else external, but
// what we will do is just use as app js.
const Tasks = ({ tasks, onDelete }) => {
    return (
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} />
            ))}
        </>
    )
}

export default Tasks

