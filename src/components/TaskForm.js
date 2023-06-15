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
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="title" />
            <textarea name="description" value={task.description} onChange={handleChange} placeholder="description" />
            <button>Save</button>
        </form>
    )
}

export default TaskForm;