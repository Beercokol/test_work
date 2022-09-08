import React, { useCallback, useState } from 'react'
import { TERMS_INPUTS_TYPE, TermType } from '../types'
import Term from '../components/term/term'
import { v4 as uuidv4 } from 'uuid'
import './modal_content.css'
import Button from '../components/button/button'
type ModalContentProps = {
    setTerms: React.Dispatch<React.SetStateAction<Array<TermType>>>
    closeModal(): void
}

const ModalContent: React.FC<ModalContentProps> = ({
    setTerms,
    closeModal,
}) => {
    const [savedTerms, setSavedTerms] = useState<TermType[]>([])

    // remove duplicate
    const changeTermValue = useCallback(
        (value: string, termId: string, type: TERMS_INPUTS_TYPE) => {
            const neededTermIndex = savedTerms.findIndex(
                ({ id }) => termId === id
            )
            const neededTerm = savedTerms.find(({ id }) => termId === id)
            if (neededTerm) {
                const editedTerm =
                    type === TERMS_INPUTS_TYPE.DEF
                        ? { ...neededTerm, definitionValue: value }
                        : { ...neededTerm, nameValue: value }

                setSavedTerms((prev) => [
                    ...prev.slice(0, neededTermIndex),
                    editedTerm,
                    ...prev.slice(neededTermIndex + 1),
                ])
            }
        },
        [savedTerms]
    )

    const createTermsUsingBufferText = (text: string): void => {
        const termsArray = text.split('\n').map((str) => ({
            id: uuidv4(),
            nameValue: str.split('\t')[0] || '',
            definitionValue: str.split('\t')[1] || '',
        }))

        setSavedTerms(termsArray)
    }

    const deleteTerm = (termId: string): void => {
        setSavedTerms((prev) => prev.filter(({ id }) => id !== termId))
    }

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLDivElement>
    ): void => {
        event.preventDefault()
        const charCode = String.fromCharCode(event.which).toLowerCase()
        if ((event.ctrlKey || event.metaKey) && charCode === 'v') {
            navigator.clipboard.readText().then((text) => {
                createTermsUsingBufferText(text)
            })
            event.preventDefault()
        }
    }

    const addToList = (): void => {
        setTerms((prev) => [...prev, ...savedTerms])
        closeModal()
    }

    return (
        <div>
            <h1>Para</h1>
            <Button
                color="normal"
                size="big"
                type="button"
                text="add to form"
                onClickHandler={addToList}
            />
            <div
                onKeyDown={handleKeyDown}
                className="save_block"
                contentEditable={true}
            />
            {savedTerms.map(({ id, nameValue, definitionValue }) => (
                <Term
                    key={id}
                    changeInputValue={changeTermValue}
                    onDelete={deleteTerm}
                    id={id}
                    nameValue={nameValue}
                    definitionValue={definitionValue}
                />
            ))}
        </div>
    )
}

export default React.memo(ModalContent)
