import React from 'react'

type ButtonProps = {
    text: string
    // eslint-disable-next-line react/require-default-props
    type?: 'button' | 'submit' | 'reset'
    size: 'big' | 'medium' | 'small'
    color: 'danger' | 'normal' | 'text'
    onClickHandler(): void
}
const Button: React.FC<ButtonProps> = ({
    text,
    type,
    size,
    color,
    onClickHandler,
}) => {
    // the best idea fix eslint-config
    /* eslint-disable react/button-has-type */
    return (
        <button type={type || 'button'} onClick={onClickHandler}>
            {text}
        </button>
    )
}

export default React.memo(Button)
