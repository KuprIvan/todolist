import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }
    const buttonStyles = {
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px'
    }

    return <div>
        <TextField id="outlined-basic"
                   label={error ? error : "Введите текст" }
                   error={!!error}
                   variant="outlined"
                   value={title}
                   size="small"
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
        />
        <Button style={buttonStyles}
                variant="contained"
                onClick={addItem}
        >+</Button>
    </div>
}
