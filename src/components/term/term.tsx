import React, { ChangeEvent, useState } from 'react'
import Input from '../input/input'
import Button from '../button/button'
import { TERMS_INPUTS_TYPE } from '../../types'
import './term.css'

interface ITermProps {
    nameValue: string
    definitionValue: string
    id: string
    onDelete(id: string): void
    changeInputValue(
        value: string,
        termId: string,
        type: TERMS_INPUTS_TYPE
    ): void
}
const Term: React.FC<ITermProps> = ({
    nameValue,
    definitionValue,
    onDelete,
    id,
    changeInputValue,
}) => {
    const [nameInputValue, setNameInputValue] = useState<string>(nameValue)
    const [defInputValue, setDefInputValue] = useState<string>(definitionValue)
    // the best idea add debounce for this stuff
    const changeNameValue = (e: ChangeEvent<HTMLInputElement>): void => {
        setNameInputValue(e.target.value)
        changeInputValue(e.target.value, id, TERMS_INPUTS_TYPE.NAME)
    }

    const changeDefValue = (e: ChangeEvent<HTMLInputElement>): void => {
        setDefInputValue(e.target.value)
        changeInputValue(e.target.value, id, TERMS_INPUTS_TYPE.DEF)
    }

    return (
        <div className="term">
            <div className="term_box_list">
                <div className="term_box">
                    <p>Term</p>
                    <Input value={nameInputValue} setValue={changeNameValue} />
                </div>
                <div className="term_box">
                    <p>Definition</p>
                    <Input value={defInputValue} setValue={changeDefValue} />
                </div>
            </div>
            <Button
                text="Delete"
                size="medium"
                color="danger"
                onClickHandler={() => onDelete(id)}
            />
        </div>
    )
}

export default React.memo(Term)
