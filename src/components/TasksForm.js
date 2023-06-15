import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../features/tasks/tasksSlice";
import { v4 as uuid}  from "uuid";

const TasksForm = () => {
    const [task, setTask] = useState({
        title: '',
        description: ''
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { value, name } = event.target;
        setTask({
            ...task,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addTask({
            ...task,
            id: uuid()
        }))
        navigate('/')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" onChange={handleChange} placeholder="title"/>
            <textarea name="description" onChange={handleChange} placeholder="description"/>
            <button>Save</button>
        </form>
    )
}

export default TasksForm;