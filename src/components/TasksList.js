import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from "../features/tasks/tasksSlice";
import { Link } from "react-router-dom";

const TasksList = () => {
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteTask(id))
    }

    return (
        <div className="w-4/6">
            <header className="flex justify-between item-center py-4">
                <h1>TasksList</h1>
                <Link to={'/create-task'} className="bg-indigo-600 px-2 py-1 rounded-sm text-sm">Create task</Link>
            </header>
            <div className="grid grid-cols-2 gap-4">
                {
                    tasks.map(({title, description, id}) => {
                        return (
                            <div className="bg-neutral-800 p-4 rounded-md" key={id}>
                                <header className="flex justify-between" >
                                    <h3>{title}</h3>
                                    <div className="flex gap-x-2">
                                        <Link className="bg-zinc-600 px-2 py-1 text-xs rounded-md" to={`/edit-task/${id}`}>Edit</Link>
                                        <button className="bg-red-500 px-2 py-1 text-xs rounded-md self-center" onClick={() => handleDelete(id)}>Delete</button>
                                    </div>
                                </header>
                                <p>{description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TasksList;