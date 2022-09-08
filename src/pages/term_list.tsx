import React, { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Term from '../components/term/term'
import { TERMS_INPUTS_TYPE, TermType } from '../types'
import Button from '../components/button/button'

type TermListProps = {
    termList: Array<TermType>
    setTermList: React.Dispatch<React.SetStateAction<Array<TermType>>>
}
export const TermList: React.FC<TermListProps> = ({
    termList,
    setTermList,
}) => {
    const deleteTerm = (termId: string): void => {
        setTermList((prev) => prev.filter(({ id }) => id !== termId))
    }

    const createNewTerm = (): void => {
        const newTerm = {
            id: uuidv4(),
            nameValue: '',
            definitionValue: '',
        }
        setTermList((prev) => [...prev, newTerm])
    }

    const changeTermValue = useCallback(
        (value: string, termId: string, type: TERMS_INPUTS_TYPE) => {
            const neededTermIndex = termList.findIndex(
                ({ id }) => termId === id
            )
            const neededTerm = termList.find(({ id }) => termId === id)
            if (neededTerm) {
                const editedTerm =
                    type === TERMS_INPUTS_TYPE.DEF
                        ? { ...neededTerm, definitionValue: value }
                        : { ...neededTerm, nameValue: value }

                setTermList((prev) => [
                    ...prev.slice(0, neededTermIndex),
                    editedTerm,
                    ...prev.slice(neededTermIndex + 1),
                ])
            }
        },
        [termList]
    )

    return (
        <div>
            <div>
                {termList.map(({ id, definitionValue, nameValue }) => (
                    <Term
                        changeInputValue={changeTermValue}
                        key={id}
                        id={id}
                        onDelete={deleteTerm}
                        nameValue={nameValue}
                        definitionValue={definitionValue}
                    />
                ))}
            </div>
            <Button
                onClickHandler={createNewTerm}
                text="Add term"
                type="button"
                color="normal"
                size="big"
            />
        </div>
    )
}
