import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);
    }





    let [todoLists, setTodoLists] = useState<Array<TodolistType>>(
        [
            {id: v1(), title: 'What to buy', filter: 'all'},
            {id: v1(), title: 'What to learn', filter: 'all'},
        ]
    )

    return (
        <div className="App">
            {todoLists.map(tl => {
                function changeFilter(value: FilterValuesType, todolistId: string) {
                    let todolist = todoLists.find(el => el.id === todolistId)
                    if (todolist) {
                        todolist.filter = value
                        setTodoLists([...todoLists])
                    }
                }

                let tasksForTodolist = tasks;

                if (tl.filter === "active") {
                    tasksForTodolist = tasks.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks.filter(t => t.isDone === true);
                }

                return <Todolist key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                />
            })}

        </div>
    );
}

export default App;
