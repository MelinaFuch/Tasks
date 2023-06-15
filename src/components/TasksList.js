import React from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/tasksSlice";
import { Link } from "react-router-dom";

const TasksList = () => {
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteTask(id))
    }

    return (
        <div>
            <header>
                <h1>TasksList</h1>
                <Link href={'/create-task'}>
                    Create task
                </Link>
            </header>
            {
                tasks.map(({title, description, id}) => {
                    return (
                        <div key={id}>
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <button onClick={() => handleDelete(id)}>Delete</button>
                            <Link href={`/edit-task/${id}`}>
                                <button>Edit</button>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TasksList;