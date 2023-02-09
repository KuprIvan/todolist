import React, {FC} from 'react';
import {TaskType} from "./TodoList";

type TasksList = {
    tasks: TaskType[]
}

const TasksList: FC<TasksList> = (props): JSX.Element => {
    // JSX Element
    // BLL:
    const tasksItems: JSX.Element[] | JSX.Element = props.tasks.length
        ? props.tasks.map((task) => {
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                </li>
            )
        })
        : <span>Your taskList is empty</span>;

    // UI:
    return (
        <ul>
            {tasksItems}
        </ul>
    );
};

export default TasksList;