import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilteredValuesType = 'all' | 'active' | 'completed'
function App(): JSX.Element {
    // BLL:

    const [filter, setFilter] = useState<FilteredValuesType>('all')
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'ES6 & TS', isDone: true},
        {id: 3, title: 'React & Redux', isDone: false},
    ])

    const todoListTitle: string = "What to learn"

    let filteredTasks:Array<TaskType> = []
    const changeFilterValues = (filter: FilteredValuesType) => setFilter(filter)
    const removeTask = (taskId: number) => {
        const updatedTask = tasks.filter(t => t.id !== taskId)
        setTasks(updatedTask)
    }

    if (filter === 'all') {
        filteredTasks = tasks
    }
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }



    // UI:
    return (
        <div className={'App'}>
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                changeFilterValue={changeFilterValues}
                removeTask={removeTask}
            />
        </div>

    );
}

export default App;
