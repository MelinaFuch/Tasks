import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: '1',
        title: 'Task 1',
        description: 'Description task 1',
        completed: false
    },
    {
        id: '2',
        title: 'Task 2',
        description: 'Description task 2',
        completed: false
    }
]

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
            // [...state, action.payload]
        },
        deleteTask: (state, action) => {
            const taskDeleted = state.find(task => task.id === action.payload);
            if (taskDeleted) {
                state.splice(state.indexOf(taskDeleted), 1)
            }
        }
    }
})

export const { addTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;