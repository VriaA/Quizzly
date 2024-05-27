import { useContext, FormEvent } from "react"
import { appContext } from "../App"
import { quizCustomizationOptions } from "../data/quizCustomizationOptions"
import { TAppContext } from "../types/appTypes"

export default function Options({menuName}: {menuName: string}): JSX.Element[] {
    const { selectedOption, setSelectedOption } = useContext(appContext) as TAppContext
    const options = quizCustomizationOptions[menuName as keyof typeof quizCustomizationOptions]

    function handleSelectionChange(e: FormEvent) {
        const optionRadioInput = e.target as HTMLInputElement
        setSelectedOption(prevSelection=> ({...prevSelection, [optionRadioInput.name]: optionRadioInput.dataset.option}))
    }

    return options.map((item, i): JSX.Element=> {
        const value: string = item === 'Multiple Choice' ? 'multiple' : item === 'True / False' ? 'boolean' : item.toLowerCase()
        const optionNumber: number = i + 1

        return (
            <li role="option" aria-selected={selectedOption[menuName as keyof typeof selectedOption] === item} key={i}>
                <input 
                    id={`${menuName}-option-${optionNumber}`} 
                    className='quiz-customization-option' 
                    type='radio' 
                    name={menuName} 
                    value={value}
                    checked={selectedOption[menuName as keyof typeof selectedOption] === item} 
                    onChange={handleSelectionChange}
                    data-option={item}
                />

                <label htmlFor={`${menuName}-option-${optionNumber}`} className='quiz-customization-option-label'>
                    {item}
                </label>
            </li>
        )
    })
}