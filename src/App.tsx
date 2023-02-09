import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilteredValuesType = 'all' | 'active' | 'completed'
function App(): JSX.Element {
    // BLL:

    const [filter, setFilter] = useState<FilteredValuesType>('all')

    const todoListTitle: string = "What to learn"

    const todoListTasks: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'ES6 & TS', isDone: true},
        {id: 3, title: 'React & Redux', isDone: false},
    ]
    let filteredTasks:Array<TaskType> = []
    const changeFilterValues = (filter: FilteredValuesType) => setFilter(filter)

    if (filter === 'all') {
        filteredTasks = todoListTasks
    }
    if (filter === 'active') {
        filteredTasks = todoListTasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todoListTasks.filter(t => t.isDone)
    }



    // UI:
    return (
        <div className={'App'}>
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                changeFilterValue={changeFilterValues}/>
        </div>

    );
}

export default App;
