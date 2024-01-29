import React, {memo} from 'react';
import {Button, ButtonProps} from "@mui/material";


interface IButtonMemo extends ButtonProps {
}

const ButtonWithMemo = memo(({title, variant, color, onClick, ...rest}: IButtonMemo) => {
    return <Button
        variant={variant}
        color={color}
        onClick={onClick}
    >
        {title}
    </Button>
});

export default ButtonWithMemo;