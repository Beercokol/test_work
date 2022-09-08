import React from 'react'

interface IButtonProps {
    text: string
    type?: 'button' | 'submit' | 'reset'
    size: 'big' | 'medium' | 'small'
    color: 'danger' | 'normal' | 'text'
    onClickHandler(): void
}
const Button: React.FC<IButtonProps> = ({
    text,
    type,
    size,
    color,
    onClickHandler,
}) => {
    return (
        <button type={type || 'button'} onClick={onClickHandler}>
            {text}
        </button>
    )
}

export default React.memo(Button)
