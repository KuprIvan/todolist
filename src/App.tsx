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
    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(el => el.id !== id)
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskId);

        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function removeTodoList(todolistId: string) {
        setTodoLists(todoLists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})

    }

    let todoListId1 = v1();
    let todoListId2 = v1();


    let [todoLists, setTodoLists] = useState<Array<TodolistType>>(
        [
            {id: todoListId1, title: 'What to buy', filter: 'all'},
            {id: todoListId2, title: 'What to learn', filter: 'all'},
        ]
    )

    let [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: 'What to buy', isDone: true},
            {id: v1(), title: 'What to learn', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'RestAPI', isDone: false},
            {id: v1(), title: 'NoSQL', isDone: true},
        ]
    })


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

                let tasksForTodolist = tasks[tl.id];

                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                }

                return <Todolist key={tl.id}
                                 id={tl.id}
                                 title={tl.title}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 removeTodoList={removeTodoList}
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
