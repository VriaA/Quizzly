import { useContext, useEffect, useState, FormEvent } from "react"
import { appContext } from "../App"
import { TAppContext } from "../types/appTypes"
import { TCategories, TTriviaCategories } from "../types/heroTypes"

export default function CategoryOptions(): JSX.Element[] {

    const { setLoading, setDialog, selectedOption, setSelectedOption } = useContext(appContext) as TAppContext
    const [categories, setCategories] = useState<TCategories>([])

    // GETS QUIZ CATEGORIES FROM THE OPEN TRIVIA DATABASE
    useEffect(()=> {
        async function getCategories(): Promise<void> {
            try {
                setLoading(true)
                const response: Response = await fetch('https://opentdb.com/api_category.php')
                const categories: TTriviaCategories = await response.json()
                setCategories([{id: 'category', name: 'Category'}, ...categories.trivia_categories])
                setTimeout(()=> setLoading(false), 1000)
            } catch (error) {
                setDialog( {
                    ['textContent']: 'Unable to load the page. Please verify your internet connection and try refreshing the page.', 
                    ['isOpen']: true} 
                    )
            }
        }
        if(categories.length === 0) {
            getCategories()
        }
    }, [])

    function handleSelectionChange(e: FormEvent) {
        const optionRadioInput = e.target as HTMLInputElement
        setSelectedOption(prevSelection=> ({...prevSelection, [optionRadioInput.name]: optionRadioInput.dataset.option}))
    }

    const OptionsEl: JSX.Element[] = categories.map( (category, i): JSX.Element=> {
        const {id, name} = category
        const optionNumber = i + 1
        return (
                <li role='option' aria-selected={selectedOption.category === name} key={i}>
                    <input 
                        id={`category-option-${optionNumber}`} 
                        className='quiz-customization-option' 
                        type='radio' 
                        name='category' 
                        value={id}
                        checked={selectedOption.category === name} 
                        onChange={handleSelectionChange}
                        data-option={name}
                    />
                    <label htmlFor={`category-option-${optionNumber}`} className='quiz-customization-option-label'>
                        {name}
                    </label>
                </li>
        )
        })
    return OptionsEl
}