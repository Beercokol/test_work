import React, { ChangeEvent } from 'react'

type InputProps = {
    value: string
    setValue(e: ChangeEvent<HTMLInputElement>): void
}
const Input: React.FC<InputProps> = ({ value, setValue }) => {
    return <input value={value} onChange={setValue} />
}

export default React.memo(Input)
