import React from 'react'

type InputProps = {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}
const Input: React.FC<InputProps> = ({ value, setValue }) => {
    return <input value={value} onChange={(e) => setValue(e.target.value)} />
}

export default React.memo(Input)
