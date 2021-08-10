
import { useState } from 'react';
// could have tasks stored in redux, or somthing else external, but
// what we will do is just use as app js.
const Tasks = ({ tasks }) => {

    return (
        <>
            {tasks.map((task) => (
                <h3 key={task.id}>{task.text}</h3>
            ))}
        </>
    )
}

export default Tasks

