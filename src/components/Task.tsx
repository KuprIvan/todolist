import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitleValue: string, todolistId: string) => void
}

export const Task = memo(({todolistId, task, removeTask, changeTaskStatus, changeTaskTitle}:TaskPropsType ) => {
    const onClickHandler = () => removeTask(task.id, todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todolistId);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId)
    }, [changeTaskTitle, task.id, todolistId]);

    return <div className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
});

export default Task;