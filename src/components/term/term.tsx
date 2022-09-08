import React, { useEffect, useState } from 'react'
import Input from '../input/input'
import Button from '../button/button'
import { TERMS_INPUTS_TYPE } from '../../types'

type TermProps = {
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
const Term: React.FC<TermProps> = ({
    nameValue,
    definitionValue,
    onDelete,
    id,
    changeInputValue,
}) => {
    const [nameInputValue, setNameInputValue] = useState<string>(nameValue)
    const [defInputValue, setDefInputValue] = useState<string>(definitionValue)

    useEffect(() => {
        changeInputValue(nameInputValue, id, TERMS_INPUTS_TYPE.NAME)
    }, [nameInputValue])

    useEffect(() => {
        changeInputValue(defInputValue, id, TERMS_INPUTS_TYPE.DEF)
    }, [defInputValue])

    return (
        <div className="term">
            <div className="term_box_list">
                <div className="term_box">
                    <p>Term</p>
                    <Input
                        value={nameInputValue}
                        setValue={setNameInputValue}
                    />
                </div>
                <div className="term_box">
                    <p>Definition</p>
                    <Input value={defInputValue} setValue={setDefInputValue} />
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
