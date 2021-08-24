// import { FaTimes } from 'react-icons/fa';

const Task = ({ task, onDelete }) => {
    return (
        <div className='task'>
            <h3>
                {task.text} 
                <span 
                    style={{ fontSize: 35 , color: 'red', cursor: 'pointer'}}
                    onClick={() => onDelete(task.id)}
                >X</span>
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
