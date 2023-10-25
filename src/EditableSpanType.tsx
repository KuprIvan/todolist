import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    value: string
    onChange: (newValue: string) => void
}

function EditableSpan(props: EditableSpanType) {
    let [title, setTitle] = useState<string>("")
    let [isEditMode, setIsEditMode] = useState<boolean>(false)

    function activateEditMode()  {
        setIsEditMode(true)
        setTitle(props.value)
    }
    function activateViewMode()  {
        setIsEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return isEditMode
        ? <input
            value={title}
            type="text"
            onChange={onChangeTitleHandler}
            onBlur={activateViewMode}
            autoFocus
        />
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
}

export default EditableSpan