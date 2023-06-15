import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTask, editTask } from "../features/tasks/tasksSlice";
import { v4 as uuid}  from "uuid";

const TaskForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const tasks = useSelector(state => state.tasks);
    const [task, setTask] = useState({
        title: '',
        description: ''
    })

    const handleChange = (event) => {
        const { value, name } = event.target;
        setTask({
            ...task,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (params.id) {
            dispatch(editTask(task))
        } else {
            dispatch(addTask({
                ...task,
                id: uuid()
            }))
        }
        navigate('/')
    }

    useEffect(() => {
        if (params.id) {
            setTask(tasks.find(task => task.id === params.id));
        }
    }, [params.id, tasks])

    return (
        <form className="bg-zinc-800 max-w-sm p-4" onSubmit={handleSubmit}>
            <label className="block text-xs font-bold" htmlFor="title">Task:</label>
            <input 
                className="w-full p-2 rounded-md bg-zinc-600 mb-2 mt-2"
                type="text"
                name="title" 
                value={task.title} 
                onChange={handleChange} 
                placeholder="title" 
            />
            <label className="block text-xs font-bold" htmlFor="description">Description:</label>
            <textarea 
                className="w-full p-2 rounded-md bg-zinc-600 mb-2 mt-2"
                name="description" 
                value={task.description} 
                onChange={handleChange} 
                placeholder="description" 
            />
            <button className="bg-indigo-600 px-2 py-1 rounded-sm text-sm">Save</button>
        </form>
    )
}

export default TaskForm;