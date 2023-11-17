import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    oldTitle: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.oldTitle)


    const editHandler = () => {
        setEdit(!edit)
        if (edit) updateTask()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const updateTask = () => {
        props.callBack(newTitle)
    }

    return (
        edit
            ? <input onChange={onChangeHandler} value={newTitle} onBlur={editHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};

