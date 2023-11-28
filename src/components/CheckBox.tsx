import React, {ChangeEvent, FC} from 'react';
import Checkbox from '@mui/material/Checkbox';

type CheckBoxType = {
    checked: boolean
    callback: (value: boolean) => void
}

const CheckBox: FC<CheckBoxType> = (props) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked)
    }

    return <>
        <Checkbox checked={props.checked} onChange={onChangeHandler}/>
    </>
};

export default CheckBox;